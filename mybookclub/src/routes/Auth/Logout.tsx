import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {Modal, ModalContent, ModalAction} from '../../components/Modal';
import {useToggle} from '../../hooks/useToggle';
// import {useAuth} from '../../contexts'
import {Button} from '../../components/Button'


const Logout: React.FC = () => {
  const [isOpen, toggleOpen] = useToggle(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // 로그아웃 로직
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <Button onClick={toggleOpen}>Logout</Button>
      <Modal open={isOpen} onClose={toggleOpen}>
        <ModalContent>
          <p>Are you sure you want to logout?</p>
        </ModalContent>
        <ModalAction>
          <Button onClick={handleLogout}>Yes</Button>
          <Button onClick={toggleOpen}>No</Button>
        </ModalAction>
      </Modal>
    </div>
  );
};

export default Logout;