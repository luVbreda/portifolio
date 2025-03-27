function AgeCalculator() {
    const [birthDate, setBirthDate] = React.useState('');
    const [age, setAge] = React.useState(null);
    const [error, setError] = React.useState('');

    function calculateAge() {
        if (!birthDate) {
            setError('Por favor, selecione uma data');
            setAge(null);
            return;
        }

        const birth = new Date(birthDate);
        const today = new Date();
        
        if (birth > today) {
            setError('A data não pode ser no futuro');
            setAge(null);
            return;
        }

        setError('');

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const lastMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += lastMonthDays;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });
    }

    return (
        <div className="calculator-container">
            <h1 className="calculator-title">Calculadora de Idade</h1>

            <div className="input-container">
                <div className="date-input-wrapper">
                    <label htmlFor="birthDate" className="date-input-label">Data de Nascimento</label>
                    <input
                        id="birthDate"
                        type="date"
                        className={`date-input ${error ? 'error' : ''}`}
                        value={birthDate}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                            setBirthDate(e.target.value);
                            setError(''); // Removendo erro ao alterar a data
                        }}
                    />
                    {error && <div className="error-message show">{error}</div>}
                </div>
            </div>

            <button className="calculate-btn" onClick={calculateAge}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>

            {age && (
                <div className="result-container">
                    <div className="result-line">
                        <span className="result-number">{age.years}</span> anos
                    </div>
                    <div className="result-line">
                        <span className="result-number">{age.months}</span> meses
                    </div>
                    <div className="result-line">
                        <span className="result-number">{age.days}</span> dias
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<AgeCalculator />, document.getElementById('root'));
