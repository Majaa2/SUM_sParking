let rolePermissions = {
    administrator: ['canGetLogs','canViewEvents', 'canCreateEvents', 'canEditEvents', 'canDeleteEvents', 
                    'canGenerateTickets', 'canViewTickets','canScanTickets', 'canPrintTickets', 'canViewPrints', 'canGeneratePrints', 'canDeletePrints', 
                    'canViewPrepaids', 'canCreatePrepaids', 'canEditPrepaids', 'canDeletePrepaids',
                    'canViewSectors', 'canCreateSectors', 'canEditSectors', 'canDeleteSectors',
                    'canViewSalesEvents', 'canViewUsersSales', 'canViewUserSales', 'canViewSalesAssignments', 'canViewSingleSaleAssignment', 'canViewAssignmentTickets',
                    'canViewEventSales', 'canCreateSaleAssignment', 'canSellTickets', 'canDeleteSaleAssignments',
                    'canViewGateReads','canChangeLang',
                    'canRegisterUsers', 'canEditUser', 'canDeleteUser'],
    sales: ['canScanTickets', 'canViewEvents','canGetLogs',
            'canViewSalesmanEvents','canChangeLang', 'canViewUserSales', 'canViewSingleSaleAssignment','canViewSalesAssignments', 'canViewEventSales', 'canViewAssignmentTickets', 'canSellTickets'],
    guest: ['canGetLogs','canScanTickets', 'canChangeLang','canViewEvents'],
}

module.exports = function (actionName) {
    return function isAllowed(req, res, next) {
        let userPermissions =  rolePermissions[req.user[0].role_name].map(function(permission){
            return permission;
        })
        if (userPermissions.indexOf(actionName) > -1){
            next();
        }else {
            return res.status(403).json({
                    success: false,
                    msg: 'Permission denied for this user!',
            });
        }
    }
};