interface FloatingInputProps {
    type: string;
    value: string;
    name: string;
    content: string;
    setValue: (value: string) => void;
}

export const FloatingInput = ({type, value, name, content, setValue}: FloatingInputProps) => {
    return (
        <div className="floating-input">
            <input 
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={content} 
                onChange={(e) => setValue(e.target.value)}/>
            <label htmlFor={name}>{content}</label>
        </div>
    )
}