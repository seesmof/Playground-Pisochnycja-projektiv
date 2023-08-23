type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "abcdef12",
    amount: 80,
    status: "pending",
    email: "another@example.com",
  },
  {
    id: "xyz456",
    amount: 150,
    status: "success",
    email: "test@example.com",
  },
  {
    id: "123456",
    amount: 200,
    status: "failed",
    email: "test@example.com",
  },
];
