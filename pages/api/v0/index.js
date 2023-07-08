export default function handler(req, res) {
  res.status(200).json(
    { message: 'Setup moar path in the same route for the magic to begin: http://localhost:3030/api/v0/magic' }
  );
};