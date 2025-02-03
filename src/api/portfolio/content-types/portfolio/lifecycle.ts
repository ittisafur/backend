module.exports = {
  beforeCreate(event) {
    event.params.data.slug = generateSlug(event.params.data.title);
  },
  beforeUpdate(event) {
    if (event.params.data.title) {
      event.params.data.slug = generateSlug(event.params.data.title);
    }
  },
};
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
