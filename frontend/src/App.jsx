import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8086/bookstores'
const emptyForm = { storeName: '', location: '', phone: '', open: true }

export default function App() {
  const [bookstores, setBookstores] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [search, setSearch] = useState('')

  const notify = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    window.setTimeout(() => setMessage(''), 3500)
  }

  async function loadBookstores() {
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Could not load bookstore records.')
      const data = await response.json()
      setBookstores(Array.isArray(data) ? data : [])
    } catch (error) {
      notify(`${error.message} Make sure the Spring Boot backend is running.`, 'danger')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadBookstores() }, [])

  const changeField = (event) => {
    const { name, value, type, checked } = event.target
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const payload = {
      storeName: form.storeName.trim(),
      location: form.location.trim(),
      phone: form.phone.trim(),
      open: Boolean(form.open)
    }
    const url = editingId === null ? API_URL : `${API_URL}/${editingId}`
    try {
      const response = await fetch(url, {
        method: editingId === null ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const detail = await response.text()
        throw new Error(detail || `Request failed (${response.status})`)
      }
      notify(editingId === null ? 'Bookstore added successfully.' : 'Bookstore updated successfully.')
      setForm(emptyForm)
      setEditingId(null)
      await loadBookstores()
    } catch (error) {
      notify(`Unable to save record: ${error.message}`, 'danger')
    }
  }

  function startEdit(item) {
    setEditingId(item.id)
    setForm({
      storeName: item.storeName ?? '',
      location: item.location ?? '',
      phone: item.phone ?? '',
      open: Boolean(item.open)
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deleteBookstore(id) {
    if (!window.confirm(`Delete bookstore record #${id}?`)) return
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok && response.status !== 204) throw new Error(`Request failed (${response.status})`)
      notify('Bookstore deleted successfully.')
      if (editingId === id) cancelEdit()
      await loadBookstores()
    } catch (error) {
      notify(`Unable to delete record: ${error.message}`, 'danger')
    }
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  const filtered = bookstores.filter(item =>
    [item.storeName, item.location, item.phone, String(item.id)]
      .some(value => String(value ?? '').toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark topbar">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#"><span className="brand-icon">B</span> Bookstore Manager</a>
          <span className="navbar-text text-white-50 small">Full-Stack CRUD Application</span>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-content">
          <div>
            <span className="eyebrow">STORE OPERATIONS</span>
            <h1>Bookstore Management</h1>
            <p>Manage bookstore details from one simple dashboard.</p>
          </div>
          <div className="hero-symbol" aria-hidden="true">▤</div>
        </div>
      </header>

      <main className="container main-content">
        {message && <div className={`alert alert-${messageType} alert-dismissible`} role="alert">
          {message}<button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Close"></button>
        </div>}

        <div className="row g-4 align-items-start">
          <div className="col-lg-4">
            <section className="panel form-panel">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">{editingId === null ? 'NEW RECORD' : `EDITING #${editingId}`}</span>
                  <h2>{editingId === null ? 'Add Bookstore' : 'Update Bookstore'}</h2>
                </div>
                <span className="heading-icon">＋</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="storeName" className="form-label">Store name</label>
                  <input id="storeName" name="storeName" className="form-control" value={form.storeName} onChange={changeField} placeholder="e.g. Campus Bookstore" required maxLength="100" />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input id="location" name="location" className="form-control" value={form.location} onChange={changeField} placeholder="City or area" required maxLength="150" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input id="phone" name="phone" className="form-control" value={form.phone} onChange={changeField} placeholder="Phone number" required minLength="7" maxLength="20" pattern="[0-9+()\- ]{7,20}" title="Enter a valid phone number" />
                </div>
                <div className="form-check form-switch status-switch mb-4">
                  <input id="open" name="open" type="checkbox" className="form-check-input" checked={form.open} onChange={changeField} />
                  <label className="form-check-label" htmlFor="open">Currently open</label>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary flex-grow-1" type="submit">{editingId === null ? 'Add Bookstore' : 'Save Changes'}</button>
                  {editingId !== null && <button className="btn btn-outline-secondary" type="button" onClick={cancelEdit}>Cancel</button>}
                </div>
                <p className="form-note mt-3 mb-0">Record ID is generated automatically.</p>
              </form>
            </section>
          </div>

          <div className="col-lg-8">
            <section className="panel records-panel">
              <div className="records-heading">
                <div>
                  <span className="section-kicker">YOUR DATABASE</span>
                  <h2>Bookstore Records</h2>
                  <p className="muted mb-0">View and maintain saved bookstore information.</p>
                </div>
                <div className="count-pill">{bookstores.length} records</div>
              </div>
              <div className="toolbar">
                <div className="search-box">
                  <span aria-hidden="true">⌕</span>
                  <input className="form-control" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, location, phone or ID" aria-label="Search bookstore records" />
                </div>
                <button className="btn btn-outline-primary refresh-btn" onClick={loadBookstores} type="button">↻ Refresh</button>
              </div>
              <div className="table-responsive">
                <table className="table align-middle records-table">
                  <thead><tr><th>ID</th><th>Bookstore</th><th>Location</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan="6" className="empty-state">Loading records…</td></tr> :
                     filtered.length === 0 ? <tr><td colSpan="6" className="empty-state"><span className="empty-icon">▤</span><br />No bookstore records found.</td></tr> :
                     filtered.map(item => <tr key={item.id}>
                       <td className="id-cell">#{item.id}</td>
                       <td><strong>{item.storeName}</strong><small className="d-block text-secondary">Bookstore</small></td>
                       <td>{item.location}</td>
                       <td>{item.phone}</td>
                       <td><span className={`status-badge ${item.open ? 'is-open' : 'is-closed'}`}><span></span>{item.open ? 'Open' : 'Closed'}</span></td>
                       <td><div className="d-flex gap-2">
                         <button className="btn btn-sm btn-edit" type="button" onClick={() => startEdit(item)} aria-label={`Edit ${item.storeName}`}>Edit</button>
                         <button className="btn btn-sm btn-delete" type="button" onClick={() => deleteBookstore(item.id)} aria-label={`Delete ${item.storeName}`}>Delete</button>
                       </div></td>
                     </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="table-footer"><span>Showing {filtered.length} of {bookstores.length} records</span><span>Connected to Spring Boot API</span></div>
            </section>
          </div>
        </div>
        <footer className="page-footer">Bookstore Manager <span>•</span> React + Spring Boot + JPA</footer>
      </main>
    </div>
  )
}
