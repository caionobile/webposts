export const dateFormater = (date) => {
  const auxDate = new Date(date);
  const formatedDate = auxDate.toLocaleDateString();
  const formatedTime = auxDate.toTimeString().split(" ")[0];
  // dd/MM/yyyy hh:mm:ss
  return `${formatedDate} ${formatedTime}`;
};
