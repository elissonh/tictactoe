import { useTranslation } from 'react-i18next';

export default function GameOver({winner, onRematch}) {
    const { t } = useTranslation();
    
    return (
        <div id="game-over">
            <h2>{t('game.gameOverDescription')}</h2>
            {winner
                ? <p>{winner} {t('game.playerWinDescription')}</p>
                : <p>{t('game.drawDescription')}</p>}
            <p>
                <button onClick={onRematch}>{t('game.rematchDescription')}</button>
            </p>
        </div>
    )
}