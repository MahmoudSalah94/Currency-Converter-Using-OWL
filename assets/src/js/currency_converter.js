

const {
    Component,
    mount,
    signal,
    xml,
    onWillStart,
    onMounted
} = owl;

class CurrencyConverter extends Component {
    static template = xml`
        <div t-att-class="this.darkMode() ? 'dark' : ''">

            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-6">

                        <div class="card converter-card">

                            <!-- HEADER -->
                            <div class="converter-header text-white">
                                <div class="d-flex justify-content-between align-items-center">

                                    <div>
                                        <h4 class="mb-0 fw-bold">💱 Currency Converter</h4>
                                        <small class="opacity-75">Live exchange rates</small>
                                    </div>

                                    <button class="btn btn-light btn-sm"
                                            t-on-click="this.toggleTheme">
                                        🌙
                                    </button>

                                </div>
                            </div>

                            <div class="card-body">

                                <!-- AMOUNT -->
                                <div class="mb-3">
                                    <label class="form-label">Amount</label>

                                    <input type="number"
                                           class="form-control form-control-lg"
                                           t-att-value="this.amount()"
                                           t-on-input="this.onAmountChange"/>
                                </div>

                                <!-- CURRENCIES -->
                                <div class="row align-items-center">

                                    <div class="col-5">
                                        <label>From</label>

                                        <select class="form-select"
                                                t-att-value="this.fromCurrency()"
                                                t-on-change="this.onFromChange">

                                            <t t-foreach="this.currencies" t-as="c" t-key="c.code">
                                                <option t-att-value="c.code">
                                                    <t t-out="c.flag"/> <t t-out="c.code"/>
                                                </option>
                                            </t>

                                        </select>
                                    </div>

                                    <div class="col-2 text-center">
                                        <button class="btn btn-light rounded-circle swap-btn"
                                                t-on-click="this.swap">
                                            ⇄
                                        </button>
                                    </div>

                                    <div class="col-5">
                                        <label>To</label>

                                        <select class="form-select"
                                                t-att-value="this.toCurrency()"
                                                t-on-change="this.onToChange">

                                            <t t-foreach="this.toCurrenciesList" t-as="c" t-key="c.code">
                                                <option t-att-value="c.code">
                                                    <t t-out="c.flag"/> <t t-out="c.code"/>
                                                </option>
                                            </t>

                                        </select>
                                    </div>

                                </div>

                                <!-- RESULT -->
                                <div class="result-box text-center mt-4">

                                    <div class="text-muted small">Converted Amount</div>

                                    <h2><t t-out="this.result()"/></h2>

                                    <div class="d-flex justify-content-center gap-2 mt-2">

                                        <button class="btn btn-sm btn-outline-primary"
                                                t-on-click="this.copy">
                                            Copy
                                        </button>

                                        <button class="btn btn-sm btn-outline-warning"
                                                t-on-click="this.toggleFavorite">
                                            ⭐
                                        </button>

                                    </div>

                                </div>

                                <!-- RATE -->
                                <div class="rate-info mt-3 text-center">
                                    <t t-out="this.rateInfo()"/>
                                </div>

                                <!-- FAVORITES -->
                                <div class="mt-4">

                                    <h6 class="fw-bold">⭐ Favorites</h6>

                                    <div class="d-flex flex-wrap gap-2">

                                        <t t-foreach="this.favorites()" t-as="f" t-key="f">
                                            <span class="badge-fav"
                                                  t-on-click="() => this.selectFavorite(f)">
                                                <t t-out="this.formatFav(f)"/>
                                            </span>
                                        </t>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    `;

    setup() {
        this.amount = signal(100);
        this.fromCurrency = signal("USD");
        this.toCurrency = signal("EUR");

        this.result = signal("--");
        this.rateInfo = signal("");
        this.darkMode = signal(false);

        this.favorites = signal(
            JSON.parse(localStorage.getItem("currency_favorites") || "[]")
        );

        this.cache = {};

        this.currencies = [
            { code: "USD", flag: "🇺🇸" },
            { code: "EUR", flag: "🇪🇺" },
            { code: "GBP", flag: "🇬🇧" },
            { code: "EGP", flag: "🇪🇬" },
            { code: "SAR", flag: "🇸🇦" },
            { code: "AED", flag: "🇦🇪" },
            { code: "JPY", flag: "🇯🇵" },
            { code: "CAD", flag: "🇨🇦" },
            { code: "AUD", flag: "🇦🇺" },
            { code: "CHF", flag: "🇨🇭" },
            { code: "KWD", flag: "🇰🇼" },
            { code: "QAR", flag: "🇶🇦" },
            { code: "BHD", flag: "🇧🇭" },
            { code: "OMR", flag: "🇴🇲" },
            { code: "JOD", flag: "🇯🇴" },
            { code: "LBP", flag: "🇱🇧" },
            { code: "SYP", flag: "🇸🇾" },
            { code: "IQD", flag: "🇮🇶" },
            { code: "MAD", flag: "🇲🇦" },
            { code: "DZD", flag: "🇩🇿" },
            { code: "TND", flag: "🇹🇳" },
            { code: "LYD", flag: "🇱🇾" },
            { code: "SDG", flag: "🇸🇩" },
        ];

        this.toCurrenciesList = [
            { code: "EUR", flag: "🇪🇺" },
            { code: "USD", flag: "🇺🇸" },
            { code: "GBP", flag: "🇬🇧" },
            { code: "EGP", flag: "🇪🇬" },
            { code: "SAR", flag: "🇸🇦" },
            { code: "AED", flag: "🇦🇪" },
            { code: "JPY", flag: "🇯🇵" },
            { code: "CAD", flag: "🇨🇦" },
            { code: "AUD", flag: "🇦🇺" },
            { code: "CHF", flag: "🇨🇭" },
            { code: "KWD", flag: "🇰🇼" },
            { code: "QAR", flag: "🇶🇦" },
            { code: "BHD", flag: "🇧🇭" },
            { code: "OMR", flag: "🇴🇲" },
            { code: "JOD", flag: "🇯🇴" },
            { code: "LBP", flag: "🇱🇧" },
            { code: "SYP", flag: "🇸🇾" },
            { code: "IQD", flag: "🇮🇶" },
            { code: "MAD", flag: "🇲🇦" },
            { code: "DZD", flag: "🇩🇿" },
            { code: "TND", flag: "🇹🇳" },
            { code: "LYD", flag: "🇱🇾" },
            { code: "SDG", flag: "🇸🇩" },
        ];

        onWillStart(() => this.convert());

        onMounted(() => {
            this.convert();
        });
    }

    /* ---------------- API ---------------- */

    async getRates(base) {
        if (this.cache[base]) return this.cache[base];

        const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        const data = await res.json();

        this.cache[base] = data;
        return data;
    }

    /* ---------------- CONVERT ---------------- */

    async convert() {
        this.result("Loading...");
        this.rateInfo("");

        const from = this.fromCurrency();
        const to = this.toCurrency();
        const amount = Number(this.amount()) || 0;

        const data = await this.getRates(from);

        if (!data?.rates) {
            this.result("API Error");
            return;
        }

        const rate = data.rates[to];

        if (!rate) {
            this.result("Rate not found");
            return;
        }

        const converted = (amount * rate).toFixed(2);
        this.result.set(`${converted} ${to}`);
        this.rateInfo.set(`1 ${from} = ${rate.toFixed(4)} ${to}`);
    }

    /* ---------------- EVENTS ---------------- */

    onAmountChange(ev) {
        this.amount.set(Number(ev.target.value));
        this.convert();
    }

    onFromChange(ev) {
        this.fromCurrency.set(ev.target.value);
        this.convert();
    }

    onToChange(ev) {
        this.toCurrency.set(ev.target.value);
        this.convert();
    }

    swap = async () => {
        const from = this.fromCurrency();
        const to = this.toCurrency();

        this.fromCurrency.set(to);
        this.toCurrency.set(from);

        await this.convert();
    };

    async copy() {
        await navigator.clipboard.writeText(this.result());
    }

    toggleTheme() {
        this.darkMode.set(!this.darkMode());
    }

    toggleFavorite() {
        const pair = `${this.fromCurrency()}-${this.toCurrency()}`;

        let favs = [...this.favorites()];

        if (favs.includes(pair)) {
            favs = favs.filter(f => f !== pair);
        } else {
            favs.push(pair);
        }

        this.favorites.set(favs);
        localStorage.setItem("currency_favorites", JSON.stringify(favs));
    }

    selectFavorite(pair) {
        const [from, to] = pair.split("-");

        this.fromCurrency.set(from);
        this.toCurrency.set(to);

        this.convert();
    }

    formatFav(f) {
        const [from, to] = f.split("-");
        return `${from} → ${to}`;
    }
}

mount(CurrencyConverter, document.getElementById("app"));
