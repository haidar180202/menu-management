// components/Alert.tsx
interface AlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
  }
  
  export const Alert = ({ message, type, onClose }: AlertProps) => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1 right-1 text-white">
        ×
      </button>
    </div>
  );