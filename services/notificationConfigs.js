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

// Does a config that fires at join time apply to the participant who just joined?
//
// Group targeting narrows "future participants" to the targeted groups — a
// participant who joins into the "2 day delay" group must not also receive the
// schedules built for the other nine groups. A config with no group targeting
// applies to everyone who joins, which is what "future participants" means.
// Participant lists are deliberately NOT consulted: they name people who were
// already enrolled when the schedule was created, so they can never match a
// joiner, and treating them as a filter would make "future participants"
// unusable on any schedule that also targets named participants.
function appliesToJoiner(cfg, group) {
  // "All current groups" targets the grouped cohort, so an ungrouped joiner is out.
  if (cfg.allCurrentGroups) return !!group;
  if (Array.isArray(cfg.groups) && cfg.groups.length > 0) {
    return !!group && cfg.groups.includes(group.id);
  }
  return true;
}

// Is this config delivered as ONE shared set of docs addressed to the group,
// rather than a personal set per participant?
//
// Two families are: yoked designs (the create routes write
// recipientGroupIds:[group] for them — that is what makes "all group members
// receive notifications at exactly the same times" hold), and one-time fixed
// calendar dates aimed at groups, which are group-addressed for the same reason.
// Everything else is expanded per participant.
function isGroupLevelConfig(cfg) {
  if (cfg.yokedDesign) return true;
  const groupTargeted = !!cfg.allCurrentGroups || (Array.isArray(cfg.groups) && cfg.groups.length > 0);
  return groupTargeted && cfg.schedule === "one-time" && cfg.target === "fixed-times";
}

module.exports = { plainConfigs, appliesToJoiner, isGroupLevelConfig };
