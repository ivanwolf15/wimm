import colors from './colors';

export const initialAccounts = [
  {
    name: 'Efectivo',
    activityCount: 0,
    active: true,
    balance: 0,
  },
  {
    name: 'Débito',
    activityCount: 0,
    active: true,
    balance: 0,
  },
  {
    name: 'Crédito',
    activityCount: 0,
    active: false,
    balance: 0,
  },
];

export const initialCategories = [
  {
    name: 'Comida',
    color: colors.blueLight,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Super',
    color: colors.orange,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Ropa',
    color: colors.green,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Fiesta',
    color: colors.danger,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Entretención',
    color: colors.purple,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Transporte',
    color: colors.yellow,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Otros',
    color: colors.gray,
    activityCount: 0,
    total: 0,
  },
];
