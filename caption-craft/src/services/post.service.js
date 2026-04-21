import api from './api';

export const createPost = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await api.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};