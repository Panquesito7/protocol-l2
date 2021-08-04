pragma solidity 0.5.17;

import {MetricsGroup} from "contracts/src/metrics/MetricsGroup.sol";

contract MetricsGroupTest is MetricsGroup {
	constructor(address _registry) public MetricsGroup(_registry) {}

	function __setMetricsCountPerProperty(address _property, uint256 _value)
		external
	{
		setMetricsCountPerProperty(_property, _value);
	}
}
