import {
	AddressRegistryInstance,
	AllocatorInstance,
	PropertyGroupInstance,
	DevInstance,
	LockupInstance,
	PropertyFactoryInstance,
	PolicyFactoryInstance,
	PolicyGroupInstance,
	MarketFactoryInstance,
	MarketGroupInstance,
	MetricsFactoryInstance,
	MetricsGroupTestInstance,
	IPolicyInstance,
	IMarketInstance,
	WithdrawInstance,
	WithdrawTestInstance,
	MetricsInstance,
	TreasuryTestInstance,
	IPolicyContract,
	LockupTestInstance,
	DevMinterInstance,
} from '../../types/truffle-contracts'

const contract = artifacts.require

export class DevProtocolInstance {
	private readonly _deployer: string

	private _addressRegistry!: AddressRegistryInstance
	private _allocator!: AllocatorInstance
	private _dev!: DevInstance
	private _lockup!: LockupInstance
	private _propertyFactory!: PropertyFactoryInstance
	private _propertyGroup!: PropertyGroupInstance
	private _policyFactory!: PolicyFactoryInstance
	private _policyGroup!: PolicyGroupInstance
	private _marketFactory!: MarketFactoryInstance
	private _marketGroup!: MarketGroupInstance
	private _metricsFactory!: MetricsFactoryInstance
	private _metricsGroup!: MetricsGroupTestInstance
	private _withdraw!: WithdrawInstance
	private _withdrawTest!: WithdrawTestInstance
	private _lockupTest!: LockupTestInstance
	private _treasury!: TreasuryTestInstance
	private _devMinter!: DevMinterInstance
	private readonly _policy!: IPolicyContract

	constructor(deployer: string) {
		this._deployer = deployer
	}

	public get fromDeployer(): { from: string } {
		return { from: this._deployer }
	}

	public get addressRegistry(): AddressRegistryInstance {
		return this._addressRegistry
	}

	public get devMinter(): DevMinterInstance {
		return this._devMinter
	}

	public get allocator(): AllocatorInstance {
		return this._allocator
	}

	public get dev(): DevInstance {
		return this._dev
	}

	public get lockup(): LockupInstance {
		return this._lockup
	}

	public get propertyFactory(): PropertyFactoryInstance {
		return this._propertyFactory
	}

	public get propertyGroup(): PropertyGroupInstance {
		return this._propertyGroup
	}

	public get policyFactory(): PolicyFactoryInstance {
		return this._policyFactory
	}

	public get policyGroup(): PolicyGroupInstance {
		return this._policyGroup
	}

	public get marketFactory(): MarketFactoryInstance {
		return this._marketFactory
	}

	public get marketGroup(): MarketGroupInstance {
		return this._marketGroup
	}

	public get metricsFactory(): MetricsFactoryInstance {
		return this._metricsFactory
	}

	public get metricsGroup(): MetricsGroupTestInstance {
		return this._metricsGroup
	}

	public get withdraw(): WithdrawInstance {
		return this._withdraw
	}

	public get withdrawTest(): WithdrawTestInstance {
		return this._withdrawTest
	}

	public get lockupTest(): LockupTestInstance {
		return this._lockupTest
	}

	public get treasury(): TreasuryTestInstance {
		return this._treasury
	}

	public get activeWithdraw(): WithdrawInstance | WithdrawTestInstance {
		if (typeof this._withdraw === 'undefined') {
			return this._withdrawTest
		}

		return this._withdraw
	}

	public async generateAddressRegistry(): Promise<void> {
		const instance = contract('AddressRegistry')
		this._addressRegistry = await instance.new(this.fromDeployer)
	}

	public async generateDevMinter(): Promise<void> {
		this._devMinter = await contract('DevMinter').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this._dev.addMinter(this._devMinter.address)
	}

	public async generateDev(): Promise<void> {
		this._dev = await contract('Dev').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'Dev',
			this._dev.address,
			this.fromDeployer
		)
	}

	public async generateAllocator(): Promise<void> {
		this._allocator = await contract('Allocator').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'Allocator',
			this._allocator.address,
			this.fromDeployer
		)
	}

	public async generateLockup(): Promise<void> {
		this._lockup = await contract('Lockup').new(
			this.addressRegistry.address,
			this.devMinter.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'Lockup',
			this._lockup.address,
			this.fromDeployer
		)
		await this._lockup.createStorage()
	}

	public async generatePropertyFactory(): Promise<void> {
		this._propertyFactory = await contract('PropertyFactory').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'PropertyFactory',
			this._propertyFactory.address,
			this.fromDeployer
		)
	}

	public async generatePropertyGroup(): Promise<void> {
		this._propertyGroup = await contract('PropertyGroup').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this._propertyGroup.createStorage({ from: this._deployer })
		await this.addressRegistry.setRegistry(
			'PropertyGroup',
			this._propertyGroup.address,
			this.fromDeployer
		)
	}

	public async generatePolicyFactory(): Promise<void> {
		this._policyFactory = await contract('PolicyFactory').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'PolicyFactory',
			this._policyFactory.address,
			this.fromDeployer
		)
	}

	public async generatePolicyGroup(): Promise<void> {
		this._policyGroup = await contract('PolicyGroup').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this._policyGroup.createStorage({ from: this._deployer })
		await this.addressRegistry.setRegistry(
			'PolicyGroup',
			this._policyGroup.address,
			this.fromDeployer
		)
	}

	public async generateMarketFactory(): Promise<void> {
		this._marketFactory = await contract('MarketFactory').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'MarketFactory',
			this._marketFactory.address,
			this.fromDeployer
		)
	}

	public async generateMarketGroup(): Promise<void> {
		this._marketGroup = await contract('MarketGroup').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'MarketGroup',
			this._marketGroup.address,
			this.fromDeployer
		)
		await this._marketGroup.createStorage(this.fromDeployer)
	}

	public async generateMetricsFactory(): Promise<void> {
		this._metricsFactory = await contract('MetricsFactory').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'MetricsFactory',
			this._metricsFactory.address,
			this.fromDeployer
		)
	}

	public async generateMetricsGroup(): Promise<void> {
		this._metricsGroup = await contract('MetricsGroupTest').new(
			this.addressRegistry.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'MetricsGroup',
			this._metricsGroup.address,
			this.fromDeployer
		)
		await this._metricsGroup.createStorage(this.fromDeployer)
	}

	public async generateWithdraw(): Promise<void> {
		this._withdraw = await contract('Withdraw').new(
			this.addressRegistry.address,
			this.devMinter.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'Withdraw',
			this._withdraw.address,
			this.fromDeployer
		)
		await this._withdraw.createStorage(this.fromDeployer)
	}

	public async generateWithdrawTest(): Promise<void> {
		this._withdrawTest = await contract('WithdrawTest').new(
			this.addressRegistry.address,
			this.devMinter.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'WithdrawTest',
			this._withdrawTest.address,
			this.fromDeployer
		)
		await this._withdrawTest.createStorage(this.fromDeployer)
	}

	public async generateLockupTest(): Promise<void> {
		this._lockupTest = await contract('LockupTest').new(
			this.addressRegistry.address,
			this.devMinter.address,
			this.fromDeployer
		)
		await this.addressRegistry.setRegistry(
			'LockupTest',
			this._lockupTest.address,
			this.fromDeployer
		)
		await this._lockupTest.createStorage(this.fromDeployer)
	}

	public async generatePolicy(
		policyContractName = 'PolicyTestBase'
	): Promise<string> {
		const policy = await contract(policyContractName).new()
		this._treasury = await contract('TreasuryTest').new(
			this.addressRegistry.address
		)
		await policy.setTreasury(this._treasury.address)
		await this._policyFactory.create(policy.address)
		await policy.setCapSetter(this._deployer)
		await this.updateCap()
		return policy.address
	}

	public async getPolicy(
		contractName: string,
		user: string
	): Promise<IPolicyInstance> {
		const tmp = await contract(contractName).new({ from: user })
		return tmp
	}

	public async getMarket(
		contractName: string,
		user: string
	): Promise<IMarketInstance> {
		const tmp = await contract(contractName).new(this.addressRegistry.address, {
			from: user,
		})
		return tmp
	}

	public async createMetrics(
		market: string,
		property: string
	): Promise<MetricsInstance> {
		return contract('Metrics').new(market, property)
	}

	public async updateCap(
		value = '115792089237316000000000000000000000'
	): Promise<void> {
		await this._lockup.updateCap(value)
	}
}
