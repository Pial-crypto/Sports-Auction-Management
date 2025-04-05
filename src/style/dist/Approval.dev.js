"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLORS = exports.StyledDialogTitle = exports.GlowingBorder = exports.StyledIconButton = exports.StatusChip = exports.StyledCard = exports.MainContainer = void 0;

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

// Update color theme for better visibility
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
  // Lighter Dark Blue
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
}; // Styled Components

exports.COLORS = COLORS;
var MainContainer = (0, _styles.styled)(_material.Box)(function (_ref) {
  var theme = _ref.theme;
  return {
    padding: theme.spacing(3),
    background: "linear-gradient(135deg, ".concat(COLORS.background, " 0%, #242F3D 100%)"),
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
var StatusChip = (0, _styles.styled)(_material.Chip)(function (_ref3) {
  var status = _ref3.status;
  var colors = {
    pending: {
      bg: COLORS.warning,
      light: (0, _styles.alpha)(COLORS.warning, 0.12)
    },
    approved: {
      bg: COLORS.success,
      light: (0, _styles.alpha)(COLORS.success, 0.12)
    },
    rejected: {
      bg: COLORS.error,
      light: (0, _styles.alpha)(COLORS.error, 0.12)
    }
  };
  return {
    backgroundColor: colors[status].light,
    color: colors[status].bg,
    fontWeight: 600,
    border: "1px solid ".concat((0, _styles.alpha)(colors[status].bg, 0.3)),
    '& .MuiChip-icon': {
      color: colors[status].bg
    },
    '&:hover': {
      backgroundColor: (0, _styles.alpha)(colors[status].bg, 0.2)
    }
  };
});
exports.StatusChip = StatusChip;
var StyledIconButton = (0, _styles.styled)(_material.IconButton)(function (_ref4) {
  var theme = _ref4.theme,
      color = _ref4.color;
  return {
    backgroundColor: (0, _styles.alpha)(color, 0.1),
    '&:hover': {
      backgroundColor: (0, _styles.alpha)(color, 0.2)
    }
  };
});
exports.StyledIconButton = StyledIconButton;
var GlowingBorder = (0, _styles.styled)(_material.Box)(function (_ref5) {
  var theme = _ref5.theme,
      color = _ref5.color;
  return {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    background: (0, _styles.alpha)(color, 0.08),
    border: "1px solid ".concat((0, _styles.alpha)(color, 0.2)),
    boxShadow: "0 0 20px ".concat((0, _styles.alpha)(color, 0.08)),
    transition: 'all 0.3s ease',
    '&:hover': {
      background: (0, _styles.alpha)(color, 0.12),
      boxShadow: "0 0 30px ".concat((0, _styles.alpha)(color, 0.12))
    }
  };
});
exports.GlowingBorder = GlowingBorder;
var StyledDialogTitle = (0, _styles.styled)(_material.DialogTitle)(function (_ref6) {
  var theme = _ref6.theme;
  return {
    background: "linear-gradient(45deg, ".concat((0, _styles.alpha)(COLORS.primary, 0.8), ", ").concat((0, _styles.alpha)(COLORS.secondary, 0.8), ")"),
    color: COLORS.text.title,
    padding: theme.spacing(3),
    fontSize: '1.5rem',
    fontWeight: 600
  };
});
exports.StyledDialogTitle = StyledDialogTitle;