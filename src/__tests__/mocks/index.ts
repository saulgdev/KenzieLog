export const mockedUser = {
  name: "Saul",
  email: "saul@mail.com",
  isAdm: false,
  password: "123456",
  address: {
    district: "Rua Heleodo Pires de camargo",
    zipCode: "18150000",
    number: "67",
    city: "Piedade",
    state: "SP",
  },
};

export const mockedAdmin = {
  name: "Marcio",
  email: "marcio@mail.com",
  isAdm: true,
  password: "123456",
  address: {
    district: "Rua Santa Ana",
    zipCode: "26054188",
    number: "21",
    city: "Rio de Janeiro",
    state: "RJ",
  },
};

export const mockedUserLogin = {
  email: "saul@mail.com",
  password: "123456",
};

export const mockedAdminLogin = {
  email: "marcio@mail.com",
  password: "123456",
};

export const mockedRequest = {
  name: "pedido de entrega",
  weight: 30,
  cubicMeters: 3,
};
