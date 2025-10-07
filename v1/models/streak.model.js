import mongoose from "mongoose";
const { Schema } = mongoose;

function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

const streakSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    currentStreak: { type: Number, default: 0, min: 0 },
    bestStreak: { type: Number, default: 0, min: 0 },
    lastCheckDate: { type: Date, default: null },
    isBroken: { type: Boolean, default: false },
  },
  { timestamps: true }
);

streakSchema.virtual("daysSinceLastCheck").get(function () {
  if (!this.lastCheckDate) return null;
  const today = startOfDay(new Date());
  const last = startOfDay(this.lastCheckDate);
  const diffMs = today.getTime() - last.getTime();
  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
});

streakSchema.virtual("isActive").get(function () {
  const days = this.daysSinceLastCheck;
  return !this.isBroken && this.currentStreak > 0 && (days === 0 || days === 1);
});

streakSchema.virtual("progressToNextDay").get(function () {
  const pages = Number(this._todayProgress || 0);
  const objective = Number(this._objectivePerDay || 0);
  if (!Number.isFinite(objective) || objective <= 0) return 0;
  const pct = Math.min(100, Math.max(0, (pages / objective) * 100));
  return Math.round(pct);
});

streakSchema.methods.updateBestStreak = function () {
  if (this.currentStreak > this.bestStreak) {
    this.bestStreak = this.currentStreak;
  }
};

streakSchema.methods.incrementStreak = function () {
  this.currentStreak += 1;
  this.lastCheckDate = startOfDay(new Date());
  this.isBroken = false;
  this.updateBestStreak();
};

streakSchema.methods.resetStreak = function () {
  this.currentStreak = 0;
  this.isBroken = true;
};

streakSchema.methods.checkProgress = function (
  pagesReadToday,
  objectivePerDay
) {
  const value = Number(pagesReadToday);
  const objective = Number(objectivePerDay);
  if (!Number.isFinite(objective) || objective <= 0) return false;

  this._todayProgress = value;
  this._objectivePerDay = objective;

  const reached = Number.isFinite(value) && value >= objective;

  const days = this.lastCheckDate
    ? Math.floor(
        (startOfDay(new Date()) - startOfDay(this.lastCheckDate)) /
          (24 * 60 * 60 * 1000)
      )
    : null;

  if (days !== null && days > 1) {
    // Missed at least one full day
    this.resetStreak();
  }

  if (
    this.lastCheckDate &&
    startOfDay(this.lastCheckDate).getTime() ===
      startOfDay(new Date()).getTime()
  ) {
    return false;
  }

  if (reached) {
    this.incrementStreak();
    return true;
  }
  return false;
};

streakSchema.methods.getStatus = function () {
  return {
    isActive: this.isActive,
    currentStreak: this.currentStreak,
    bestStreak: this.bestStreak,
    daysSinceLastCheck: this.daysSinceLastCheck,
    progressToNextDay: this.progressToNextDay,
    lastCheckDate: this.lastCheckDate,
    updatedAt: this.updatedAt,
    createdAt: this.createdAt,
    isBroken: this.isBroken,
  };
};

streakSchema.index({ userId: 1 }, { unique: true });

const Streak = mongoose.model("Streak", streakSchema);
export default Streak;
