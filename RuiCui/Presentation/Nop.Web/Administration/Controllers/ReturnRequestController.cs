﻿using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Admin.Models.Orders;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Localization;
using Nop.Core.Domain.Orders;
using Nop.Services.Customers;
using Nop.Services.Helpers;
using Nop.Services.Localization;
using Nop.Services.Logging;
using Nop.Services.Messages;
using Nop.Services.Orders;
using Nop.Services.Security;
using Nop.Web.Framework.Controllers;
using Nop.Web.Framework.Kendoui;
using Nop.Services.Shipping;
using Nop.Services.Refund;
using Nop.Core.Domain.Refund;

namespace Nop.Admin.Controllers
{
    public partial class ReturnRequestController : BaseAdminController
    {
        #region Fields

        private readonly IOrderService _orderService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly ICustomerService _customerService;
        private readonly ILocalizationService _localizationService;
        private readonly IWorkContext _workContext;
        private readonly IWorkflowMessageService _workflowMessageService;
        private readonly LocalizationSettings _localizationSettings;
        private readonly ICustomerActivityService _customerActivityService;
        private readonly IPermissionService _permissionService;
        private readonly IShipmentService _shipmentService;
        private readonly IRefundOrderService _refundOrderService;
        private readonly IRefundOrderItemService _refundOrderItemService;

        #endregion Fields

        #region Constructors

        public ReturnRequestController(IOrderService orderService,
            ICustomerService customerService, IDateTimeHelper dateTimeHelper,
            ILocalizationService localizationService, IWorkContext workContext,
            IWorkflowMessageService workflowMessageService, LocalizationSettings localizationSettings,
            ICustomerActivityService customerActivityService, IPermissionService permissionService, IShipmentService shipmentService, IRefundOrderService refundOrderService, IRefundOrderItemService refundOrderItemService)
        {
            this._orderService = orderService;
            this._customerService = customerService;
            this._dateTimeHelper = dateTimeHelper;
            this._localizationService = localizationService;
            this._workContext = workContext;
            this._workflowMessageService = workflowMessageService;
            this._localizationSettings = localizationSettings;
            this._customerActivityService = customerActivityService;
            this._permissionService = permissionService;
            this._shipmentService = shipmentService;
            this._refundOrderService = refundOrderService;
            this._refundOrderItemService = refundOrderItemService;
        }

        #endregion

        #region Utilities

        [NonAction]
        protected bool PrepareReturnRequestModel(ReturnRequestModel model,
            ReturnRequest returnRequest, bool excludeProperties)
        {
            if (model == null)
                throw new ArgumentNullException("model");

            if (returnRequest == null)
                throw new ArgumentNullException("returnRequest");

            var orderItem = _orderService.GetOrderItemById(returnRequest.OrderItemId);
            if (orderItem == null)
                return false;

            model.Id = returnRequest.Id;
            model.ProductId = orderItem.ProductId;
            model.ProductName = orderItem.Product.Name;
            model.OrderId = orderItem.OrderId;
            model.CustomerId = returnRequest.CustomerId;
            var customer = returnRequest.Customer;
            model.CustomerInfo = customer.IsRegistered() ? customer.Email : _localizationService.GetResource("Admin.Customers.Guest");
            model.Quantity = returnRequest.Quantity;
            model.ReturnRequestStatusStr = returnRequest.ReturnRequestStatus.GetLocalizedEnum(_localizationService, _workContext);
            model.CreatedOn = _dateTimeHelper.ConvertToUserTime(returnRequest.CreatedOnUtc, DateTimeKind.Utc);
            if (!excludeProperties)
            {
                model.ReasonForReturn = returnRequest.ReasonForReturn;
                model.RequestedAction = returnRequest.RequestedAction;
                model.CustomerComments = returnRequest.CustomerComments;
                model.StaffNotes = returnRequest.StaffNotes;
                model.ReturnRequestStatusId = returnRequest.ReturnRequestStatusId;
            }
            //model is successfully prepared
            return true;
        }

        #endregion

        #region Methods

        //list
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();

            return View();
        }

        [HttpPost]
        //public ActionResult List(DataSourceRequest command)
        //{
        //    if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
        //        return AccessDeniedView();

        //    var returnRequests = _orderService.SearchReturnRequests(0, 0, 0, null, command.Page - 1, command.PageSize);
        //    var returnRequestModels = new List<ReturnRequestModel>();
        //    foreach (var rr in returnRequests)
        //    {
        //        var m = new ReturnRequestModel();
        //        if (PrepareReturnRequestModel(m, rr, false))
        //            returnRequestModels.Add(m);
        //    }
        //    var gridModel = new DataSourceResult
        //    {
        //        Data = returnRequestModels,
        //        Total = returnRequests.TotalCount,
        //    };

        //    return Json(gridModel);
        //}
        //后台发起退货list
        public ActionResult List(DataSourceRequest command)
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();
            var gridModel = new DataSourceResult();
            var Datas = _refundOrderService.GetAllRefundOrders();
            var allRefundOrder = new PagedList<RefundOrder>(Datas, command.Page - 1, command.PageSize);
            gridModel.Data = allRefundOrder;
            gridModel.Total = allRefundOrder.TotalCount;
            return Json(gridModel);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">orderId</param>
        /// <returns></returns>
        public ActionResult CreateOrUpdateReturnRequest(int id)
        {
            var refundOrder = _refundOrderService.GetRefundOrderByOrderId(id);
            var refundOrderItems = _refundOrderItemService.GetAllRefundOrderItems(id);
            var orderItems = _orderService.GetAllOrderItems(id, null, null, null, null, null, null);
            if (orderItems == null)
                return new HttpUnauthorizedResult();
            var model = new RefundOrderModel();
            if (refundOrder != null)
            {
                foreach (var item in orderItems)
                {
                    SelectListItem selectItem = new SelectListItem();
                    selectItem.Selected = false;
                    selectItem.Value = item.Id.ToString();
                    selectItem.Text = item.Product.Name;
                    model.ChoseOrderItemIds = item.Id.ToString() + ',';
                    model.SelectList.Add(selectItem);
                }
                foreach (var item in model.SelectList)
                {
                    for (int i = 0; i < refundOrderItems.Count; i++)
                    {
                        if (item.Value == refundOrderItems[i].OrderItemId.ToString())
                        {
                            item.Selected = true;
                        }
                        model.ChoseOrderItemIds = model.ChoseOrderItemIds + refundOrderItems[i].OrderItemId + ",";
                    }
                }
                model.RefundOrderId = refundOrder.Id;
                model.OperatorEmail = refundOrder.OperatorEmail;
                model.OperatorId = refundOrder.OperatorId;
                model.ReasonForRefund = refundOrder.ReasonForRefund;
                model.RefundAmount = refundOrder.RefundAmount;
                model.OrderId = refundOrder.OrderId;
            }
            else
            {
                foreach (var item in orderItems)
                {
                    SelectListItem selectItem = new SelectListItem();
                    selectItem.Selected = true;
                    selectItem.Value = item.Id.ToString();
                    selectItem.Text = item.Product.Name;
                    model.ChoseOrderItemIds = item.Id.ToString() + ',';
                    model.SelectList.Add(selectItem);
                }
                model.OrderId = id;
            }
            return View(model);
        }

        [HttpPost, ActionName("CreateOrUpdateReturnRequest")]
        [FormValueRequired("save")]
        public ActionResult CreateOrUpdateReturnRequest(RefundOrderModel model)
        {

            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();
            if (ModelState.IsValid)
            {
                if (model.RefundOrderId > 0)
                {
                    var refundOrder = _refundOrderService.GetRefundOrderById(model.RefundOrderId);
                    refundOrder.ReasonForRefund = model.ReasonForRefund;
                    refundOrder.RefundAmount = model.RefundAmount;
                    refundOrder.OperatorId = _workContext.CurrentCustomer.Id;
                    refundOrder.OperatorEmail = _workContext.CurrentCustomer.Email;
                    refundOrder.OperateTime = DateTime.Now;
                    _refundOrderService.UpdateRefundOrder(refundOrder);
                    string[] orderItemIds = model.ChoseOrderItemIds.TrimEnd(',').Split(',');
                    var refundOrderItems = _refundOrderItemService.GetAllRefundOrderItems(model.OrderId);
                    for (int i = 0; i < refundOrderItems.Count; i++)
                    {
                        _refundOrderItemService.DeleteRefundOrderItem(refundOrderItems[i]);
                    }
                    foreach (var item in orderItemIds)
                    {
                        RefundOrderItem refundorderItem = new RefundOrderItem();
                        refundorderItem.OrderId = model.OrderId;
                        refundorderItem.OrderItemId = Convert.ToInt32(item);
                        _refundOrderItemService.InsertRefundOrderItem(refundorderItem);
                        SuccessNotification("修改退货请求成功");
                    }

                }
                else
                {
                    RefundOrder refundOrder = new RefundOrder();
                    refundOrder.OrderId = model.OrderId;
                    refundOrder.ReasonForRefund = model.ReasonForRefund;
                    refundOrder.RefundAmount = model.RefundAmount;
                    refundOrder.OperatorId = _workContext.CurrentCustomer.Id;
                    refundOrder.OperatorEmail = _workContext.CurrentCustomer.Email;
                    refundOrder.OperateTime = DateTime.Now;
                    _refundOrderService.InsertRefundOrder(refundOrder);
                    string[] orderItemIds = model.ChoseOrderItemIds.TrimEnd(',').Split(',');
                    foreach (var item in orderItemIds)
                    {
                        RefundOrderItem refundorderItem = new RefundOrderItem();
                        refundorderItem.OrderId = model.OrderId;
                        refundorderItem.OrderItemId = Convert.ToInt32(item);
                        _refundOrderItemService.InsertRefundOrderItem(refundorderItem);
                    }
                    var order = _orderService.GetOrderById(model.OrderId);
                    order.OrderStatus = OrderStatus.Complete;
                    _orderService.UpdateOrder(order);
                    SuccessNotification("添加退货请求成功");
                }
                return RedirectToAction("List");
            }
            else
            {
                var orderItems = _orderService.GetAllOrderItems(model.OrderId, null, null, null, null, null, null);
                if (orderItems == null)
                    return new HttpUnauthorizedResult();
                foreach (var item in orderItems)
                {
                    SelectListItem selectItem = new SelectListItem();
                    selectItem.Selected = true;
                    selectItem.Value = item.Id.ToString();
                    selectItem.Text = item.Product.Name;
                    model.SelectList.Add(selectItem);
                }
                model.RefundAmount = 0;
            }
            return View(model);
        }

        //edit
        public ActionResult Edit(int id)
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();

            var returnRequest = _orderService.GetReturnRequestById(id);
            if (returnRequest == null)
                //No return request found with the specified id
                return RedirectToAction("List");

            var model = new ReturnRequestModel();
            PrepareReturnRequestModel(model, returnRequest, false);
            return View(model);
        }

        [HttpPost, ParameterBasedOnFormName("save-continue", "continueEditing")]
        [FormValueRequired("save", "save-continue")]
        public ActionResult Edit(ReturnRequestModel model, bool continueEditing)
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();

            var returnRequest = _orderService.GetReturnRequestById(model.Id);
            if (returnRequest == null)
                //No return request found with the specified id
                return RedirectToAction("List");

            if (ModelState.IsValid)
            {
                returnRequest.ReasonForReturn = model.ReasonForReturn;
                returnRequest.RequestedAction = model.RequestedAction;
                returnRequest.CustomerComments = model.CustomerComments;
                returnRequest.StaffNotes = model.StaffNotes;
                returnRequest.ReturnRequestStatusId = model.ReturnRequestStatusId;
                returnRequest.UpdatedOnUtc = DateTime.UtcNow;
                _customerService.UpdateCustomer(returnRequest.Customer);

                //activity log
                _customerActivityService.InsertActivity("EditReturnRequest", _localizationService.GetResource("ActivityLog.EditReturnRequest"), returnRequest.Id);

                SuccessNotification(_localizationService.GetResource("Admin.ReturnRequests.Updated"));
                return continueEditing ? RedirectToAction("Edit", returnRequest.Id) : RedirectToAction("List");
            }


            //If we got this far, something failed, redisplay form
            PrepareReturnRequestModel(model, returnRequest, true);
            return View(model);
        }

        [HttpPost, ActionName("Edit")]
        [FormValueRequired("notify-customer")]
        public ActionResult NotifyCustomer(ReturnRequestModel model)
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();

            var returnRequest = _orderService.GetReturnRequestById(model.Id);
            if (returnRequest == null)
                //No return request found with the specified id
                return RedirectToAction("List");

            //var customer = returnRequest.Customer;
            var orderItem = _orderService.GetOrderItemById(returnRequest.OrderItemId);
            int queuedEmailId = _workflowMessageService.SendReturnRequestStatusChangedCustomerNotification(returnRequest, orderItem, _localizationSettings.DefaultAdminLanguageId);
            if (queuedEmailId > 0)
                SuccessNotification(_localizationService.GetResource("Admin.ReturnRequests.Notified"));
            return RedirectToAction("Edit", returnRequest.Id);
        }

        //delete
        [HttpPost]
        public ActionResult Delete(int id)
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageReturnRequests))
                return AccessDeniedView();

            var returnRequest = _orderService.GetReturnRequestById(id);
            if (returnRequest == null)
                //No return request found with the specified id
                return RedirectToAction("List");

            _orderService.DeleteReturnRequest(returnRequest);

            //activity log
            _customerActivityService.InsertActivity("DeleteReturnRequest", _localizationService.GetResource("ActivityLog.DeleteReturnRequest"), returnRequest.Id);

            SuccessNotification(_localizationService.GetResource("Admin.ReturnRequests.Deleted"));
            return RedirectToAction("List");
        }

        #endregion
    }
}
