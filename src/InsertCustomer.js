
import { useState } from "react";
import { insertCustomer } from "./CustomerService";
import { useNavigate } from "react-router-dom";
import "./App.css";

function InsertCustomer() {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        cname: "",
        age: "",
        phoneNumber: "",
        city: "",
        state: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCustomer((previousCustomer) => ({
            ...previousCustomer,
            [name]: value,
        }));
    };

    const save = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !customer.cname.trim() ||
            !customer.age ||
            !customer.phoneNumber.trim() ||
            !customer.city.trim() ||
            !customer.state.trim()
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!/^\d{10}$/.test(customer.phoneNumber)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        const age = Number(customer.age);

        if (!Number.isInteger(age) || age < 1 || age > 120) {
            setError("Please enter an age between 1 and 120.");
            return;
        }

        try {
            setLoading(true);

            await insertCustomer({
                ...customer,
                cname: customer.cname.trim(),
                age,
                phoneNumber: customer.phoneNumber,
                city: customer.city.trim(),
                state: customer.state.trim(),
            });

            navigate("/get");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save customer. Please check the server and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="omni-page">
            <aside className="omni-sidebar">
                <div className="omni-brand">
                    <div className="omni-logo">O</div>
                    <span>OmniDesk</span>
                </div>

                <p className="sidebar-label">WORKSPACE</p>

                <button
                    className="sidebar-link active"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    <span>＋</span> Add Customer
                </button>

                <button
                    className="sidebar-link"
                    type="button"
                    onClick={() => navigate("/get")}
                >
                    <span>▤</span> All Customers
                </button>

                <div className="sidebar-bottom">
                    <div className="profile-avatar">A</div>
                    <div>
                        <strong>Administrator</strong>
                        <small>Customer Portal</small>
                    </div>
                </div>
            </aside>

            <main className="omni-main">
                <header className="omni-header">
                    <div>
                        <span className="breadcrumb">
                            Workspace / Customers
                        </span>
                        <h1>Customer Management</h1>
                        <p>
                            Manage your customer information in one place.
                        </p>
                    </div>

                    <button
                        className="view-button"
                        type="button"
                        onClick={() => navigate("/get")}
                    >
                        View Customers ↗
                    </button>
                </header>

                <section className="welcome-banner">
                    <div>
                        <span className="banner-tag">
                            CUSTOMER WORKSPACE
                        </span>
                        <h2>Every customer, connected.</h2>
                        <p>
                            Add customer details and keep your records
                            organized with OmniDesk.
                        </p>
                    </div>

                    <div className="banner-art" aria-hidden="true">
                        <div className="art-circle">O</div>
                        <div className="art-dot dot-one" />
                        <div className="art-dot dot-two" />
                    </div>
                </section>

                <section className="omni-card">
                    <div className="card-heading">
                        <div className="heading-icon">＋</div>
                        <div>
                            <h2>Add New Customer</h2>
                            <p>
                                Enter the details below to create a
                                customer record.
                            </p>
                        </div>
                    </div>

                    <div className="form-divider" />

                    <form onSubmit={save}>
                        <div className="section-caption">
                            <span>01</span> PERSONAL INFORMATION
                        </div>

                        <div className="omni-form-grid">
                            <div className="omni-field full-width">
                                <label htmlFor="cname">
                                    Customer Name *
                                </label>
                                <input
                                    id="cname"
                                    name="cname"
                                    type="text"
                                    placeholder="Enter full name"
                                    value={customer.cname}
                                    onChange={handleChange}
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="omni-field">
                                <label htmlFor="age">Age *</label>
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    placeholder="Enter age"
                                    min="1"
                                    max="120"
                                    step="1"
                                    value={customer.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="omni-field">
                                <label htmlFor="phoneNumber">
                                    Phone Number *
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="10-digit mobile number"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    value={customer.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="section-caption address-caption">
                            <span>02</span> LOCATION DETAILS
                        </div>

                        <div className="omni-form-grid">
                            <div className="omni-field">
                                <label htmlFor="city">City *</label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Enter city"
                                    value={customer.city}
                                    onChange={handleChange}
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="omni-field">
                                <label htmlFor="state">State *</label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    placeholder="Enter state"
                                    value={customer.state}
                                    onChange={handleChange}
                                    maxLength={100}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="omni-error" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="form-divider bottom-divider" />

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => navigate("/get")}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Customer →"}
                            </button>
                        </div>
                    </form>
                </section>

                <footer className="omni-footer">
                    <span>© 2026 OmniDesk</span>
                    <span>Customer management, made simple.</span>
                </footer>
            </main>
        </div>
    );
}

export default InsertCustomer;
