export const fileToDataUri = (image) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      res(reader.result.replace(/^data:.+;base64,/, ''))
    });
    reader.readAsDataURL(image);
  })
}

export const uploadImage = async (e, setCallback) => {
  if (e.target.files && e.target.files.length > 0) {
    const newImagesPromises = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newImagesPromises.push(fileToDataUri(e.target.files[i]));
    }
    const newImages = await Promise.all(newImagesPromises);
    setCallback(newImages);
  }
}

export const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
}
