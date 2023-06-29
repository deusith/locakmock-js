import { writeFileSync } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { endpointPath, formFields } = req.body;
  console.log(endpointPath, '\n', formFields);
  try {
    writeFileSync(path.join(process.cwd(), `/endpoints/${endpointPath}.json`), JSON.stringify(formFields));
  } catch (err) {
    console.log(err);
    // res.status(500).json({ err })
  }
  res.status(200).json({ok:'ok'});
};