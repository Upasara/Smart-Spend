export const defaultCategories = [
 //income
 {
  id: 'salary',
  name: 'Salary',
  type: 'INCOME',
  color: '#22c55e',
  icon: 'Wallet',
 },
 {
  id: 'freelance',
  name: 'Freelance',
  type: 'INCOME',
  color: '#06b6d4',
  icon: 'Laptop',
 },
 {
  id: 'investment',
  name: 'Investment',
  type: 'INCOME',
  color: '#8b5cf6',
  icon: 'TrendingUp',
 },
 {
  id: 'business',
  name: 'Business',
  type: 'INCOME',
  color: '#8b5cf6',
  icon: 'TrendingUp',
 },
 {
  id: 'other-income',
  name: 'Other Income',
  type: 'INCOME',
  color: '#64748b',
  icon: 'Wallet',
 },

 //expense
 {
  id: 'housing',
  name: 'Housing',
  type: 'EXPENSE',
  color: '#22c55e',
  icon: 'Home',
 },
 {
  id: 'groceries',
  name: 'Groceries',
  type: 'EXPENSE',
  color: '#06b6d4',
  icon: '',
 },
 {
  id: 'utilities',
  name: 'Utilities',
  type: 'EXPENSE',
  color: '#f59e0b',
  icon: 'NotebookText',
 },
 {
  id: 'entertainment',
  name: 'Entertainment',
  type: 'EXPENSE',
  color: '#a855f7',
  icon: 'Clapperboard',
 },
 {
  id: 'transportation',
  name: 'Transportations',
  type: 'EXPENSE',
  color: '#3b82f6',
  icon: 'Bus',
 },
 {
  id: 'food',
  name: 'Food',
  type: 'EXPENSE',
  color: '#14b8a6',
  icon: 'Hamburger',
 },
 {
  id: 'shopping',
  name: 'Shoping',
  type: 'EXPENSE',
  color: '#f43f5e',
  icon: 'ShoppingBag',
 },
 {
  id: 'healthcare',
  name: 'Health Care',
  type: 'EXPENSE',
  color: '#6366f1',
  icon: 'HeartPulse',
 },
 {
  id: 'education',
  name: 'Education',
  type: 'EXPENSE',
  color: '#84cc16',
  icon: 'GraduationCap',
 },
 {
  id: 'insuarance',
  name: 'Insuarance',
  type: 'EXPENSE',
  color: '#4338ca',
  icon: 'ShieldPlus',
 },
 {
  id: 'personal',
  name: 'Personal',
  type: 'EXPENSE',
  color: '#ec4899',
  icon: 'UserRound  ',
 },
 {
  id: 'gifts',
  name: 'Gifts',
  type: 'EXPENSE',
  color: '#eab308',
  icon: 'Gift',
 },
 {
  id: 'other-expenses',
  name: 'Other Expenses',
  type: 'EXPENSE',
  color: '#f97316',
  icon: 'BanknoteArrowDown',
 },
];

export const categoryColor = defaultCategories.reduce((acc, category) => {
 acc[category.id] = category.color;
 return acc;
}, {});
