export const fileToDataUri = (image) => {
  return new Promise((res) => {
    const reader = new FileReader();
    const {type, name, size} = image;
    reader.addEventListener('load', () => {
      res(reader.result.replace(/^data:.+;base64,/, ''))
    });
    reader.readAsDataURL(image);
  })
}

export const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
}
