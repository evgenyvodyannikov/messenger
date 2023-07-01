import { GB, RU } from 'country-flag-icons/react/3x2';

type Language = 'EN' | 'RU';

interface LanguageSwitcherProps {
    handleSwitch: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({handleSwitch}) => {
    return (
        <div className='absolute bottom-5 right-5 flex h-8 gap-3'>
            <GB title="English" className="sm:max-w-xs" onClick={() => handleSwitch('EN')}/>
            <RU title="Russian" className="sm:max-w-xs" onClick={() => handleSwitch('RU')}/>
        </div>
    );
};

export default LanguageSwitcher;