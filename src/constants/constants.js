import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const SIDENAV_MENU_ITEMS = [
  { icon: <DashboardIcon />, label: "Dashboard", pathLink: "dashboard" },
  {
    icon: <AccountBalanceWalletIcon />,
    label: "Accounts",
    pathLink: "accounts",
  },
  { icon: <AttachMoneyIcon />, label: "Payroll", pathLink: "payroll" },
  { icon: <DescriptionIcon />, label: "Reports", pathLink: "reports" },
  { icon: <PersonIcon />, label: "Advisor", pathLink: "advisor" },
  { icon: <ContactsIcon />, label: "Contacts", pathLink: "contacts" },
];

export const CURVED_LINE_DATA = [35, 5, 15, 60, 20, 40, 10, 75, 60, 32];

export const STACKED_BAR_DATA = [
  { category: "August", A: 10, B: 20 },
  { category: "September", A: 20, B: 30 },
  { category: "October", A: 30, B: 60 },
  { category: "November", A: 25, B: 40 },
  { category: "December", A: 15, B: 20 },
  { category: "January", A: 40, B: 43 },
];

export const BAR_CHART_DATA = [
  { xlabel: "Older", value: 16 },
  { xlabel: "Jan 01-08", value: 100 },
  { xlabel: "Jan 09-16", value: 52 },
  { xlabel: "Jan 17-24", value: 31 },
  { xlabel: "Jan 25-31", value: 25 },
  { xlabel: "Future", value: 10 },
];

export function generateCurvedGraphData(length) {
  const randomData = [...Array(10)].map((e) => ~~(Math.random() * 100));
  return randomData;
}

export function generateStackedGraphData(length) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = [];
  for (let i = 0; i < length; i++) {
    const category = months[Math.floor(Math.random() * months.length)];
    const A = Math.floor(Math.random() * (55 - 15 + 1)) + 15;
    const B = Math.floor(Math.random() * (55 - 15 + 1)) + 15;
    data.push({ category, A, B });
  }
  return data;
}

export function generateBarGraphData() {
  const labels = [
    "Older",
    "Jan 01-08",
    "Jan 09-16",
    "Jan 17-24",
    "Jan 25-31",
    "Future",
  ];
  const data = [];
  for (let i = 0; i < labels.length; i++) {
    const xlabel = labels[i];
    const value = Math.floor(Math.random() * 100) + 1;
    data.push({ xlabel, value });
  }
  return data;
}
