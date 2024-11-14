// {
//   let age: Number = 10;
//   let name: String = "Huấn";
//   let isInfo: Boolean = true;
//   type addInfo = { address: String };
//   // có thể sử dụng thuộc tính type như 1 class kế thừa để có thể sử dụng
//   const myInfor: addInfo = {
//     address: "Hà Tây",
//   };

//   console.log(
//     `Tôi tên ${name} ${age} tuổi ở ${myInfor.address} thông tin ${
//       isInfo ? "Đúng" : "Sai"
//     }`
//   );
// }
// thực thi không cần biên dịch ts-node file cần chạy

type User = {
  id: Number;
  firstName: String;
  lastName: String;
  maidenName: String;
  age: Number;
  gender: String;
  email: String;
  phone: String;
  username: String;
  password: String;
  birthDate: String;
  image: String;
  bloodGroup: String;
  height: Number;
  weight: Number;
  eyeColor: String;
  hair: {
    color: String;
    type: String;
  };
  ip: String;
  address: {
    address: String;
    city: String;
    state: String;
    stateCode: String;
    postalCode: String;
    coordinates: {
      lat: Number;
      lng: Number;
    };
    country: String;
    macAddress: String;
    university: String;
    bank: {
      cardExpire: String;
      cardNumber: String;
      cardType: String;
      currency: String;
      iban: String;
    };
    company: {
      department: String;
      name: String;
      title: String;
      address: {
        address: String;
        city: String;
        state: String;
        stateCode: String;
        postalCode: String;
        coordinates: {
          lat: Number;
          lng: Number;
        };
        country: String;
      };
    };
    ein: String;
    ssn: String;
    userAgent: String;
    crypto: {
      coin: String;
      wallet: String;
      network: String;
    };
    role: String;
  };
  macAddress: String;
  university: String;
  bank: {
    cardExpire: String;
    cardNumber: String;
    cardType: String;
    currency: String;
    iban: String;
  };
  company: {
    department: String;
    name: String;
    title: String;
    address: {
      address: String;
      city: String;
      state: String;
      stateCode: String;
      postalCode: String;
      coordinates: {
        lat: Number;
        lng: Number;
      };
      country: String;
    };
  };
  ein: String;
  ssn: String;
  userAgent: String;
  crypto: {
    coin: String;
    wallet: String;
    network: String;
  };
  role: String;
};

const user: User = {
  id: 1,
  firstName: "Emily",
  lastName: "Johnson",
  maidenName: "Smith",
  age: 28,
  gender: "female",
  email: "emily.johnson@x.dummyjson.com",
  phone: "+81 965-431-3024",
  username: "emilys",
  password: "emilyspass",
  birthDate: "1996-5-30",
  image: "https://dummyjson.com/icon/emilys/128",
  bloodGroup: "O-",
  height: 193.24,
  weight: 63.16,
  eyeColor: "Green",
  hair: {
    color: "Brown",
    type: "Curly",
  },
  ip: "42.48.100.32",
  address: {
    address: "626 Main Street",
    city: "Phoenix",
    state: "Mississippi",
    stateCode: "MS",
    postalCode: "29112",
    coordinates: {
      lat: -77.16213,
      lng: -92.084824,
    },
    country: "United States",
    macAddress: "47:fa:41:18:ec:eb",
    university: "University of Wisconsin--Madison",
    bank: {
      cardExpire: "03/26",
      cardNumber: "9289760655481815",
      cardType: "Elo",
      currency: "CNY",
      iban: "YPUXISOBI7TTHPK2BR3HAIXL",
    },
    company: {
      department: "Engineering",
      name: "Dooley, Kozey and Cronin",
      title: "Sales Manager",
      address: {
        address: "263 Tenth Street",
        city: "San Francisco",
        state: "Wisconsin",
        stateCode: "WI",
        postalCode: "37657",
        coordinates: {
          lat: 71.814525,
          lng: -161.150263,
        },
        country: "United States",
      },
    },
    ein: "977-175",
    ssn: "900-590-289",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    crypto: {
      coin: "Bitcoin",
      wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
      network: "Ethereum (ERC20)",
    },
    role: "admin",
  },
  macAddress: "47:fa:41:18:ec:eb",
  university: "University of Wisconsin--Madison",
  bank: {
    cardExpire: "03/26",
    cardNumber: "9289760655481815",
    cardType: "Elo",
    currency: "CNY",
    iban: "YPUXISOBI7TTHPK2BR3HAIXL",
  },
  company: {
    department: "Engineering",
    name: "Dooley, Kozey and Cronin",
    title: "Sales Manager",
    address: {
      address: "263 Tenth Street",
      city: "San Francisco",
      state: "Wisconsin",
      stateCode: "WI",
      postalCode: "37657",
      coordinates: {
        lat: 71.814525,
        lng: -161.150263,
      },
      country: "United States",
    },
  },
  ein: "977-175",
  ssn: "900-590-289",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
  crypto: {
    coin: "Bitcoin",
    wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
    network: "Ethereum (ERC20)",
  },
  role: "admin",
};

// ! TODO: Khai báo kiểu dữ liệu cho object user và sử dụng nó để khai báo biến user

{
  function indenity<T>(arg: T) {
    return arg;
  }
  let result = indenity<String>("Huấn là siêu nhân");
  let resultNumber = indenity<Number>(20);
}
{
  // item là các giá trị trong mảng nhận 1 kiểu dữ liệu T 1 mảng và trả về 1 mảng
  function arr<T>(item: T[]): T[] {
    return item;
  }

  const users = arr<String>(["Anh", "Quỳnh", "Thư", "Huấn"]);
  const usersNumber = arr<Number>([1, 2, 3, 4, 5, 6]);
}

{
  // Trước khi khởi tạo obj bằng cách khai báo 1 đối tượng thì phải định nghĩa interface cho nó
  interface Obj<K, V> {
    key: K;
    value: V;
  }
  // sau khi định nghĩa xong thì có thể sử dụng nó với cú pháp như sau
  function createObj<K, V>(key: K, value: V): Obj<K, V> {
    return { key, value };
  }
  let myInfo = createObj<String, Number>("Huấn", 20);
}
// Khi nào cần khai báo thêm cả kiểu dữ liệu
// Khi khai báo biến, hàm, arr, object, arrow function
