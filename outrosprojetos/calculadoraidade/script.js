function AgeCalculator() {
    const [birthDate, setBirthDate] = React.useState('');
    const [age, setAge] = React.useState(null);
    const [error, setError] = React.useState('');
    const [today] = React.useState(new Date().toISOString().split('T')[0]);

    function calculateAge() {
        if (!birthDate) {
            setError('Por favor, selecione uma data');
            return;
        }
        
        const birth = new Date(birthDate);
        const today = new Date();
        
        // Verificar se a data é futura
        if (birth > today) {
            setError('A data não pode ser no futuro');
            return;
        }
        
        setError('');
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });
    }

    return (
        <div className="container">
            <h1>Calculadora de Idade</h1>
            
            <div className="input-container">
                <label htmlFor="birthDate">Data de Nascimento</label>
                <input
                    id="birthDate"
                    type="date"
                    className={`date-input ${error ? 'error' : ''}`}
                    value={birthDate}
                    max={today}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                <div className={`error-message ${error ? 'show' : ''}`}>
                    {error}
                </div>
            </div>
            
            <button className="calculate-btn" onClick={calculateAge}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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