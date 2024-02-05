// Base price is $10 per month
const BASE_PRICE_PER_MONTH = 10;

// When age is above 50 the price is doubled
const RISK_AGE = 50;
const RISK_AGE_MULTIPLY_FACTOR = 2;

// Eligible to apply if age is between 16 to 70 years
const MINIMUM_AGE = 16;
const MAXIMUM_AGE = 70;

// When the policy holder is smoker the price is multiply by 0.4
const SMOKER_MULTIPLY_FACTOR = 0.4;

// When policy holder has sedentary life style the price is multiply by 0.7
const NO_SPORTS_MULTIPLY_FACTOR = 0.7;

type PolicyProps = {
  id?: number;
  name: string;
  age: number;
  smoker: boolean;
  sedentary: boolean;
  startDate: string;
};

export type Unmarshalled = Omit<PolicyProps, "id"> & {
  id: number;
  price: number;
};

export class PolicyEntity {
  constructor(private props: PolicyProps) {
    Object.assign(this, props);
  }

  private set id(id: number) {
    this.props.id = id ? id : null;
  }

  private set name(policyHolderName: string) {
    if (!policyHolderName) {
      throw new Error("The policy holder name is required");
    }
    this.props.name = policyHolderName;
  }

  private set age(policyHolderAge: number) {
    if (!policyHolderAge) {
      throw new Error("The policy holder age is required");
    }

    // Eligible to apply if age is between 16 to 70 years
    if (policyHolderAge < MINIMUM_AGE || policyHolderAge > MAXIMUM_AGE) {
      throw new Error("The policy holder age has to be between 16 and 70 years");
    }
    this.props.age = policyHolderAge;
  }

  private set sedentary(hasSedentaryLifeStyle: boolean) {
    if (hasSedentaryLifeStyle === undefined) {
      throw new Error("The sedentary lifestyle indicator is required");
    }
    this.props.sedentary = hasSedentaryLifeStyle;
  }

  private set smoker(regularSmoker: boolean) {
    if (regularSmoker === undefined) {
      throw new Error("The smoker indicator is required");
    }
    this.props.smoker = regularSmoker;
  }

  private set startDate(date: string) {
    const timestamp = Date.parse(date);
    if (isNaN(timestamp)) {
      throw Error("The policy start date is required");
    }
    const startDate = new Date(timestamp);
    // A policy start date must be a date after today.
    if (startDate <= new Date()) {
      throw new Error("The policy start date must be after today");
    }
    this.props.startDate = date;
  }

  private get id(): number {
    return this.props.id;
  }

  private get price(): number {
    // Base price is $10 per month
    let price = BASE_PRICE_PER_MONTH;

    // When age is above 50 the price is doubled
    if (this.props.age > RISK_AGE) {
      price *= RISK_AGE_MULTIPLY_FACTOR;
    }

    // When the policy holder is smoker the price is multiply by 0.4
    if (this.isSmoker()) {
      price += price * SMOKER_MULTIPLY_FACTOR;
    }

    // When policy holder has sedentary life style the price is multiply by 0.7
    if (this.isSedentary()) {
      price += price * NO_SPORTS_MULTIPLY_FACTOR;
    }

    return Math.round(price);
  }

  private get age(): number {
    return this.props.age;
  }

  private get name(): string {
    return this.props.name;
  }

  private get startDate(): string {
    return this.props.startDate;
  }

  private isSmoker(): boolean {
    return this.props.smoker;
  }

  private isSedentary(): boolean {
    return this.props.sedentary;
  }

  unmarshalled(): Unmarshalled {
    return {
      id: this.id,
      age: this.age,
      name: this.name,
      smoker: this.isSmoker(),
      sedentary: this.isSedentary(),
      startDate: this.startDate,
      price: this.price,
    };
  }
}
