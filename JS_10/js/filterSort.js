// js/filterSort.js

import { getAgeFromDOB } from './utils.js';

const applyFilters = (users, filters) => {
  return users.filter((user) => {
    const { first, last } = user.name;
    const age = user.dob.age;
    const dobYear = new Date(user.dob.date).getFullYear();
    const location = user.location.city + ' ' + user.location.country;
    const email = user.email;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const fullName = `${first} ${last}`.toLowerCase();
      if (!fullName.includes(searchLower)) return false;
    }
    if (filters.ageFrom !== null && age < filters.ageFrom) return false;
    if (filters.ageTo !== null && age > filters.ageTo) return false;
    if (filters.yearFrom !== null && dobYear < filters.yearFrom) return false;
    if (filters.yearTo !== null && dobYear > filters.yearTo) return false;
    if (filters.location && !location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.email && !email.toLowerCase().includes(filters.email.toLowerCase())) return false;

    return true;
  });
};

const applySort = (users, sortBy, sortOrder) => {
  const sorted = [...users];
  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        {
          const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
          const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
          if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
          if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
      case 'age':
        return sortOrder === 'asc' ? a.dob.age - b.dob.age : b.dob.age - a.dob.age;
      case 'registered':
        return sortOrder === 'asc'
          ? new Date(a.registered.date) - new Date(b.registered.date)
          : new Date(b.registered.date) - new Date(a.registered.date);
      default:
        return 0;
    }
  });
  return sorted;
};

export { applyFilters, applySort };
