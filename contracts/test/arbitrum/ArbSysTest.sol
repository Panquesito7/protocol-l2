// SPDX-License-Identifier: MPL-2.0
pragma solidity =0.8.9;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract ArbSysTest {
	Counters.Counter private idCounter;

	using Counters for Counters.Counter;

	// solhint-disable-next-line no-unused-vars
	function sendTxToL1(address destination, bytes calldata calldataForL1)
		external
		payable
		returns (uint256)
	{
		idCounter.increment();
		return idCounter.current();
	}

	function isTopLevelCall() external pure returns (bool) {
		return true;
	}
}
