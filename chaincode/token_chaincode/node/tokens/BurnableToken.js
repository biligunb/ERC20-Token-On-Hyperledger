const shim = require("fabric-shim");
const MintableToken = require("./MintableToken");
const Validations = require("../helpers/validations");
const Utils = require("../helpers/utils");

const ClientIdentity = shim.ClientIdentity;

/**
 * @title Burnable token
 * @dev Simple ERC20 Token example, with burnable token creation
 */
const BurnableToken = class extends MintableToken {
  /**
   * @dev Whether burning is allowed or not
   */
  async isBurningAllowed(stub) {
    let _isBurningAllowed = await stub.getState("isBurningAllowed");
    _isBurningAllowed = Utils.defaultToUndefinedIfEmpty(_isBurningAllowed);
    return _isBurningAllowed;
  }

  /**
   * @dev Function to Update BurningState
   */
  async updateBurningState(stub, args, thisClass) {
    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validations.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validations.checkMspId(tokenOwnerMspId);
    Validations.checkCallerIsOwner(callerMspId, tokenOwnerMspId);

    Validations.checkArgsLength(args, 1);
    const [bool] = args;
    Validations.isString(bool);
    Validations.isTrueOrFalse(bool);
    const newBurningState = Utils.toBuffer(bool);

    try {
      await stub.putState("isBurningAllowed", newBurningState);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }

  /**
   * @dev Function to burn tokens
   */
  async burn(stub, args, thisClass) {
    const isBurningAllowed = thisClass["isBurningAllowed"];
    const _isBurningAllowed = (await isBurningAllowed(stub)).toString();
    Validations.isBurningTrue(_isBurningAllowed);

    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validations.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validations.checkMspId(tokenOwnerMspId);
    Validations.checkCallerIsOwner(callerMspId, tokenOwnerMspId);
    Validations.checkArgsLength(args, 2);

    let [toMspId, value] = args;
    Validations.isString(toMspId);
    Validations.checkMspId(toMspId);
    Validations.isString(value);
    Validations.isGreaterThanZero(value);
    value = parseFloat(value);

    const balanceOf = thisClass["getBalanceOf"];
    const totalSupply = thisClass["getTotalSupply"];
    const promises = [balanceOf(stub, [toMspId]), totalSupply(stub)];
    const buffers = await Promise.all(promises);
    const [balanceOfFrom, _totalSupply] = buffers.map(buffer =>
      Utils.bufferToFloat(buffer)
    );

    Validations.checkBalance(balanceOfFrom);
    Validations.checkTotalSupply(_totalSupply);
    Validations.isSmallerOrEqual(value, balanceOfFrom);

    const newTotalSupply = Utils.toBuffer(_totalSupply - value);
    const newBalance = Utils.toBuffer(balanceOfFrom - value);

    try {
      await stub.putState("totalSupply", newTotalSupply);
      await stub.putState(toMspId, newBalance);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }
};

module.exports = BurnableToken;
