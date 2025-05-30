export const users = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$ZHXbm/EA2dVcvOhODFEBqO5xGnIuQUQ6G3yAP0P4QMYGcNFh.YC1a', 
  },
];

export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}
export function addUser(user) {
  users.push(user);
  return user;
}ес
export function getUsers() {
  return [...users];
} 