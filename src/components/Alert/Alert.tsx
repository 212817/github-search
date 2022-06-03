import './Alert.scss'

export enum alertType { Loading = 'loading', Error = 'error', Info = 'info' }

type Props = {
    children: string,
    type: alertType
}

const Alert = ({ children, type }: Props) => {
    return (
        <div className={'alert ' + type}>{children}</div>
    )
}

export default Alert