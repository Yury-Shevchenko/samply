// Helpers for reading project.notifications on the Express side.
//
// The legacy Project schema (models/Project.js) is strict, so Mongoose drops
// any path it does not declare while hydrating a document — the field is still
// in MongoDB, but `cfg.someField` reads as undefined. The Next.js routes write
// these configs through a strict:false model, so a field added there is
// invisible here until models/Project.js is updated too. That mismatch is what
// silently zeroed the "delay after joining" offset at join time.
//
// toObject() returns every stored path, declared or not, so normalising configs
// through it makes the Express readers immune to the next such divergence.
function plainConfigs(configs) {
  if (!Array.isArray(configs)) return [];
  return configs.map((cfg) =>
    cfg && typeof cfg.toObject === "function" ? cfg.toObject() : cfg
  );
}

module.exports = { plainConfigs };
