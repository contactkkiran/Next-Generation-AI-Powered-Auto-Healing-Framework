// This is an interface.
// It defines a contract saying:
// Any database class must implement:
// connect()

export interface IDatabase {
  connect(): Promise<void>;
}
