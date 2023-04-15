import React, { FC } from 'react'
interface IProps {
    children: React.ReactNode
}
const Layout: FC<IProps> = ({ children }) => {
    return <div>{children}</div>
}

export default Layout
