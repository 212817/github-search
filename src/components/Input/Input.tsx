import { useEffect, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce';

import Alert, { alertType } from 'components/Alert/Alert';

import './Input.scss'

const DELAY = 300;

type Props = {
    search: (value: string) => void,
    placeholder: string
}

const Input = ({ search, placeholder }: Props) => {
    const [value, setValue] = useState('');
    const debounceValue = useDebounce(value, DELAY);

    useEffect(() => {
        search(debounceValue)
    }, [debounceValue, search])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div className="search">
            <input
                type={'text'}
                className="search-text-input"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
            {(debounceValue.length === 1) && <Alert type={alertType.Info}>one more letter please</Alert>}
        </div>
    )
}

export default Input