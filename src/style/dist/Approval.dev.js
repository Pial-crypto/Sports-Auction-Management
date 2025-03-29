"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledIconButton = exports.StatusChip = exports.FilterButton = exports.StyledCard = exports.MainContainer = exports.COLORS = void 0;

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var COLORS = {
  primary: '#3B82F6',
  // Bright Blue
  secondary: '#6366F1',
  // Indigo
  success: '#22C55E',
  // Green
  warning: '#F59E0B',
  // Amber
  error: '#EF4444',
  // Red
  info: '#06B6D4',
  // Cyan
  background: '#1E293B',
  // Dark Blue
  paper: '#293548',
  // Lighter Slate
  border: '#475569',
  // Slate
  text: {
    primary: '#F8FAFC',
    // Very Light Gray
    secondary: '#CBD5E1',
    // Light Gray
    title: '#FFFFFF' // White

  }
};
exports.COLORS = COLORS;
var MainContainer = (0, _styles.styled)(_material.Box)(function (_ref) {
  var theme = _ref.theme;
  return {
    padding: theme.spacing(3),
    background: "linear-gradient(135deg, ".concat(COLORS.background, " 0%, #0F172A 100%)"),
    minHeight: '100vh',
    color: COLORS.text.primary
  };
});
exports.MainContainer = MainContainer;
var StyledCard = (0, _styles.styled)(_material.Card)(function (_ref2) {
  var theme = _ref2.theme;
  return {
    background: (0, _styles.alpha)('#FFF', 0.05),
    backdropFilter: 'blur(12px)',
    borderRadius: theme.spacing(2),
    border: "1px solid ".concat((0, _styles.alpha)('#FFF', 0.1)),
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: "0 12px 24px ".concat((0, _styles.alpha)('#000', 0.2)),
      background: (0, _styles.alpha)('#FFF', 0.08)
    }
  };
});
exports.StyledCard = StyledCard;
var FilterButton = (0, _styles.styled)(_material.ToggleButton)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: '#CBD5E1',
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    '&.Mui-selected': {
      color: '#FFFFFF',
      background: 'rgba(59, 130, 246, 0.5)',
      '&:hover': {
        background: 'rgba(59, 130, 246, 0.6)'
      }
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)'
    }
  };
});
exports.FilterButton = FilterButton;
var StatusChip = (0, _styles.styled)(_material.Chip)(function (_ref4) {
  var status = _ref4.status;
  var colors = {
    pending: COLORS.warning,
    approved: COLORS.success,
    rejected: COLORS.error
  };
  return {
    backgroundColor: (0, _styles.alpha)(colors[status], 0.12),
    color: colors[status],
    fontWeight: 600,
    border: "1px solid ".concat((0, _styles.alpha)(colors[status], 0.3))
  };
});
exports.StatusChip = StatusChip;
var StyledIconButton = (0, _styles.styled)(_material.IconButton)(function (_ref5) {
  var theme = _ref5.theme,
      color = _ref5.color;
  return {
    backgroundColor: (0, _styles.alpha)(color || COLORS.primary, 0.1),
    '&:hover': {
      backgroundColor: (0, _styles.alpha)(color || COLORS.primary, 0.2)
    },
    '& .MuiSvgIcon-root': {
      color: color || COLORS.primary
    },
    padding: theme.spacing(1),
    transition: 'all 0.2s ease'
  };
});
exports.StyledIconButton = StyledIconButton;