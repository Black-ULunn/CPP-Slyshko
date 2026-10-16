
export const users = [];
export const applications = [];

let userIdCounter = 1;
let applicationIdCounter = 1;

export function getNextUserId() {
  return String(userIdCounter++);
}

export function getNextApplicationId() {
  return String(applicationIdCounter++);
}
