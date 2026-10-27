import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Layers, 
  CreditCard, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  ShieldCheck
} from 'lucide-react';
import { SubscriptionTier } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    allUsers, 
    updateUserTier, 
    toggleUserSuspension, 
    templates, 
    deleteTemplate, 
    toggleTemplateTier, 
    transactions, 
    processRefund, 
    resolveAccessProblem,
    privacyRequests,
    updatePrivacyRequestStatus,
    supportTickets,
    updateTicketStatus,
    openTemplateInEditor
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'templates' | 'transactions' | 'popia' | 'tickets'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [txnSearch, setTxnSearch] = useState('');
  const [suspendModalUserId, setSuspendModalUserId] = useState<string | null>(null);
  const [suspendReason, setSuspendReason] = useState('Terms of service violation review');
  const [refundModalTxnId, setRefundModalTxnId] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState('Duplicate payment / Technical access remedy');

  const filteredUsers = allUsers.filter(u => 
    !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredTxns = transactions.filter(t => 
    !txnSearch || t.reference.toLowerCase().includes(txnSearch.toLowerCase()) || t.userName.toLowerCase().includes(txnSearch.toLowerCase()) || t.invoiceNumber.toLowerCase().includes(txnSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            System Administration & Governance
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 tracking-tight">
            Automation Solutions Platform Console
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage users, templates, plans, financial transactions, refunds, and statutory POPIA data requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Admin Active</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-neutral-200 overflow-x-auto pb-1 text-xs font-medium text-neutral-600 scrollbar-none">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'users' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'templates' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Template Management ({templates.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'transactions' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Transactions & Refunds ({transactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('popia')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'popia' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>POPIA Privacy Requests ({privacyRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'tickets' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Support Tickets ({supportTickets.length})</span>
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user by name or email..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">POPIA Marketing</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-neutral-900">{user.name}</div>
                      <div className="text-[11px] font-mono text-neutral-500">{user.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={user.tier}
                        onChange={(e) => updateUserTier(user.id, e.target.value as SubscriptionTier)}
                        className="p-1 border border-neutral-300 rounded text-xs bg-white uppercase font-mono font-semibold"
                      >
                        <option value="free">FREE</option>
                        <option value="pro">PRO</option>
                        <option value="agency">AGENCY</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 font-mono uppercase text-neutral-600">
                      {user.role}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-neutral-600">
                      {user.marketingConsent ? 'Consented' : 'Opted Out'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          if (user.status === 'active') {
                            setSuspendModalUserId(user.id);
                          } else {
                            toggleUserSuspension(user.id);
                          }
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                          user.status === 'active'
                            ? 'text-red-700 bg-red-50 hover:bg-red-100'
                            : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend (Fair Process)' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs text-neutral-500 font-mono">
              Total Published Templates: {templates.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Template Title</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Dimensions</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3 text-center">Downloads</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {templates.map((tmpl) => (
                  <tr key={tmpl.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-neutral-900">
                      {tmpl.title}
                    </td>
                    <td className="py-3 px-3 text-neutral-600">
                      {tmpl.categoryLabel}
                    </td>
                    <td className="py-3 px-3 font-mono text-neutral-500 tabular-nums">
                      {tmpl.designData.width}&times;{tmpl.designData.height}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleTemplateTier(tmpl.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                          tmpl.tier === 'premium' ? 'bg-amber-100 text-amber-900' : 'bg-neutral-100 text-neutral-800'
                        }`}
                        title="Click to toggle Free/Premium"
                      >
                        {tmpl.tier}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-center font-mono tabular-nums">
                      {tmpl.downloadsCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => openTemplateInEditor(tmpl)}
                        className="px-2.5 py-1 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTemplate(tmpl.id)}
                        className="px-2.5 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs text-neutral-500 font-mono">
              Audit Log: {transactions.length} Gateway Events
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Item / Plan</th>
                  <th className="py-3 px-3">Gateway</th>
                  <th className="py-3 px-3 text-right">Amount (ZAR)</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredTxns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-neutral-400 text-xs">
                      No customer transactions on record yet.
                    </td>
                  </tr>
                ) : (
                  filteredTxns.map((t) => (
                    <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-neutral-900">
                      {t.reference}
                      <div className="text-[10px] text-neutral-400 font-normal">{t.invoiceNumber}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-neutral-900">{t.userName}</div>
                      <div className="text-[10px] font-mono text-neutral-500">{t.userEmail}</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-700">
                      {t.planName}
                    </td>
                    <td className="py-3 px-3 text-neutral-600">
                      {t.paymentMethodLabel}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-neutral-900 tabular-nums">
                      R {t.amountZAR.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        t.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => resolveAccessProblem(t.id)}
                        className="px-2 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded"
                        title="Force refresh access rights"
                      >
                        Sync Access
                      </button>
                      {t.status === 'completed' && (
                        <button
                          onClick={() => setRefundModalTxnId(t.id)}
                          className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'popia' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div>
              <h3 className="font-display font-bold text-neutral-900 text-sm">
                POPIA Section 23 & 24 Data Subject Requests
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Statutory queue for data access, correction, objection, and account deletion.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">DSR Ref #</th>
                  <th className="py-3 px-3">Data Subject</th>
                  <th className="py-3 px-3">Request Type</th>
                  <th className="py-3 px-3">Details</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {privacyRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-400 text-xs">
                      No data subject requests on record.
                    </td>
                  </tr>
                ) : (
                  privacyRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-neutral-900">
                      {req.requestNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-neutral-900">{req.dataSubjectName}</div>
                      <div className="text-[10px] font-mono text-neutral-500">{req.dataSubjectEmail}</div>
                    </td>
                    <td className="py-3 px-3 font-mono uppercase text-xs">
                      {req.requestType}
                    </td>
                    <td className="py-3 px-3 text-neutral-600 max-w-xs truncate">
                      {req.description}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        req.status === 'fulfilled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {req.status !== 'fulfilled' && (
                        <button
                          onClick={() => updatePrivacyRequestStatus(req.id, 'fulfilled')}
                          className="px-3 py-1 bg-neutral-900 text-white rounded text-xs font-semibold hover:bg-neutral-800"
                        >
                          Fulfill Request
                        </button>
                      )}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="font-display font-bold text-neutral-900 text-sm">
              Customer Support & Complaints Queue
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Ticket #</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Order #</th>
                  <th className="py-3 px-3">Subject & Message</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {supportTickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-neutral-400 text-xs">
                      No customer support tickets on record.
                    </td>
                  </tr>
                ) : (
                  supportTickets.map((tkt) => (
                    <tr key={tkt.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-neutral-900">
                      {tkt.ticketNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-neutral-900">{tkt.name}</div>
                      <div className="text-[10px] font-mono text-neutral-500">{tkt.email}</div>
                    </td>
                    <td className="py-3 px-3 uppercase font-mono text-[11px] text-neutral-600">
                      {tkt.category}
                    </td>
                    <td className="py-3 px-3 font-mono text-neutral-500">
                      {tkt.orderNumber || '-'}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-medium text-neutral-900 truncate">{tkt.subject}</div>
                      <div className="text-neutral-500 text-[11px] truncate">{tkt.message}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        tkt.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {tkt.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {tkt.status !== 'resolved' && (
                        <button
                          onClick={() => updateTicketStatus(tkt.id, 'resolved')}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 text-white rounded hover:bg-emerald-800"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {suspendModalUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-neutral-200">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-display font-bold text-neutral-900 text-base">
                Fair Process Suspension Notice
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              In accordance with Section 8 of our Terms and Conditions, account suspension requires documenting clear grounds and notifying the customer with the right of appeal.
            </p>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                Grounds for Suspension
              </label>
              <textarea
                rows={3}
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded text-xs"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSuspendModalUserId(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleUserSuspension(suspendModalUserId, suspendReason);
                  setSuspendModalUserId(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}

      {refundModalTxnId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-neutral-200">
            <h3 className="font-display font-bold text-neutral-900 text-base">
              Approve & Process Refund
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Approved refunds will be marked on the transaction audit log and credit notes issued to the customer&apos;s originating payment instrument.
            </p>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                Reason / Investigation Note
              </label>
              <input
                type="text"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded text-xs"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setRefundModalTxnId(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  processRefund(refundModalTxnId, refundReason);
                  setRefundModalTxnId(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg"
              >
                Process Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
