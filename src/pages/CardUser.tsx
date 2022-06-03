import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import api from 'API/api';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { parceData, transformData } from 'utils/parceData';

import Input from 'components/Input/Input';
import Alert, { alertType } from 'components/Alert/Alert';
import { IRepo, IUser, repoFields } from 'types/IType';


const CardUser = () => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [repos, setRepos] = useState<IRepo[]>([] as IRepo[]);
    const [filterRepos, setFilterRepos] = useState('');
    const [showRepos, setshowRepos] = useState<number>(10);
    const [isloading, setisLoading] = useState<boolean>(false);
    const [errore, setErrore] = useState<boolean>(false);

    const [setIsFetching] = useInfiniteScroll(loadMore);

    const { name } = useParams<string>();

    function loadMore() {
        setIsFetching(false);
        setshowRepos((prev) => prev + 10);
    }
    useEffect(() => {
        getUser(name);
        getRepo(name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUser = (searchQuery: string = '') => {
        setisLoading(true)
        api.get(`users/${searchQuery}`)
            .then(res => {
                setErrore(false)
                setUser(res.data)
                setisLoading(false)
            })
            .catch(error => {
                setisLoading(false)
                setErrore(true);
            })
    }

    const getRepo = (searchQuery: string = '') => {
        setisLoading(true)
        api.get(`users/${searchQuery}/repos`)
            .then(res => transformData(res.data, repoFields))
            .then(res => {
                setErrore(false)
                setRepos(res)
                setisLoading(false)
            })
            .catch(error => {
                setisLoading(false)
                setErrore(true);
            })
    }

    const searchRepo = (value: string) => {
        setFilterRepos(value);
    }
    /**
     * Return a list of repos that match the filter.
     * @returns A function that returns a list of repos.
     */
    const listRepo = () => {
        return (
            repos.filter(item => item.name.includes(filterRepos))
                .slice(0, showRepos).map((repo) =>
                    <div key={repo.id} className="listRepo">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" >{repo.name} </a>
                        <div className="repoCount">
                            <div className="repo-forks">{repo.forks_count} forks</div>
                            <div className="repo-stars">{repo.stargazers_count} stars</div>
                        </div>
                    </div>
                )
        )
    }

    return (
        <>
            <div className="card">
                <div className="avatar">
                    <img src={user.avatar_url} alt="" />
                </div>
                <div className="infoUser">
                    <h3>{name}</h3>
                    <div>Email: {user?.email || '-'}</div>
                    <div>Location: {user?.location || '-'}</div>
                    <div>Join Date: {user?.created_at && parceData(user.created_at)}</div>
                    <div>{user?.followers} Followers</div>
                    <div>Following {user?.following} </div>
                </div>
            </div>
            <p className="card-info">This is biography. It may be long and needs to all fit</p>
            <Input search={searchRepo} placeholder={'Search for User`s Repositiries'} />
            {isloading && <Alert type={alertType.Loading}>Loading ....</Alert>}
            {errore && <Alert type={alertType.Error}>Something went wrong, try again later</Alert>}
            {listRepo()}
        </>
    )
}

export default CardUser