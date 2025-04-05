"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusCount = exports.confirmReject = exports.confirmApprove = exports.handleReject = exports.handleApprove = exports.getFilteredRequests = exports.handleStatusFilter = void 0;

var _handleApprovalActions = require("./handleApprovalActions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Handlers
var handleStatusFilter = function handleStatusFilter(status, setFilterStatus) {
  setFilterStatus(status);
};

exports.handleStatusFilter = handleStatusFilter;

var getFilteredRequests = function getFilteredRequests(filterStatus, requests) {
  if (filterStatus === 'all') return requests;
  return requests.filter(function (request) {
    return request.status === filterStatus;
  });
};

exports.getFilteredRequests = getFilteredRequests;

var handleApprove = function handleApprove(request, setConfirmDialog) {
  setConfirmDialog({
    open: true,
    type: 'approve',
    request: request
  });
};

exports.handleApprove = handleApprove;

var handleReject = function handleReject(request, setRejectDialog) {
  setRejectDialog({
    open: true,
    request: request
  });
};

exports.handleReject = handleReject;

var confirmApprove = function confirmApprove(requests, confirmDialog, setRequests, setConfirmDialog, setSnackbar) {
  var approvedRequest = _objectSpread({}, confirmDialog.request, {
    status: 'approved'
  });

  (0, _handleApprovalActions.handleApprovePlayer)(approvedRequest).then(function (res) {
    if (res) {
      // Remove the request from current position and add it to the beginning
      var otherRequests = requests.filter(function (req) {
        return req.id !== confirmDialog.request.id;
      });
      var updatedRequests = [approvedRequest].concat(_toConsumableArray(otherRequests));
      setRequests(updatedRequests);
      setConfirmDialog({
        open: false,
        type: null,
        request: null
      });
      setSnackbar({
        open: true,
        message: 'Request approved successfully',
        severity: 'success'
      });
    } else {
      alert("Failed to approve request");
    }
  });
};

exports.confirmApprove = confirmApprove;

var confirmReject = function confirmReject(requests, rejectDialog, rejectReason, setRequests, setRejectDialog, setRejectReason, setSnackbar) {
  var rejectedRequest = _objectSpread({}, rejectDialog.request, {
    status: 'rejected',
    rejectionReason: rejectReason
  });

  (0, _handleApprovalActions.handleRejectiontoPlayerReq)(rejectedRequest).then(function (res) {
    if (res) {
      // Remove the request from current position and add it to the beginning
      var otherRequests = requests.filter(function (req) {
        return req.id !== rejectDialog.request.id;
      });
      var updatedRequests = [rejectedRequest].concat(_toConsumableArray(otherRequests));
      setRequests(updatedRequests);
      setRejectDialog({
        open: false,
        request: null
      });
      setRejectReason('');
      setSnackbar({
        open: true,
        message: 'Request rejected',
        severity: 'error'
      });
    } else {
      alert("Failed to reject request");
    }
  });
};

exports.confirmReject = confirmReject;

var getStatusCount = function getStatusCount(requests, status) {
  return requests.filter(function (req) {
    return req.status === status;
  }).length;
};

exports.getStatusCount = getStatusCount;