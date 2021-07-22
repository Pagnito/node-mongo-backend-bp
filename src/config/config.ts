import os from 'os';
export default {
  "clusters": {
    "dev": 1,
    "qa": 3,
    "prod": os.cpus().length
  },
  "mongo_collections": ["user"]
}