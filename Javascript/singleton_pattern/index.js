class DBConnection {
  static _instance = null;

  constructor() {
    if (DBConnection._instance) {
      console.log('기존 인스턴스 반환');
      return DBConnection._instance;
    }
    DBConnection._instance = this;
  }

  connect() {
    console.log('connect');
  }

  disconnect() {
    console.log('disconnect');
  }
}

const dbConnecion1 = new DBConnection();
const dbConnecion2 = new DBConnection();

dbConnecion1.connect();
dbConnecion2.connect();
