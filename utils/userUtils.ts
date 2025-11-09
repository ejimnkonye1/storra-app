export const getFirstName = (fullname: string): string => {
  if (!fullname) return 'User';
  return fullname.trim().split(' ')[0];
};

export const getInitials = (fullname: string): string => {
  if (!fullname) return 'U';
  
  const names = fullname.trim().split(' ');
  
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};