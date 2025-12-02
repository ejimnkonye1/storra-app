// components/ErrorModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ErrorModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  showCloseButton?: boolean;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  title,
  message,
  onClose,
  showCloseButton = true,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm items-center shadow-lg">
          {/* Error Icon */}
          <View className="w-20 h-20 rounded-full bg-red-100 justify-center items-center mb-4">
            <Ionicons name="warning-outline" size={48} color="#DC2626" />
          </View>

          {/* Title */}
          <Text className="text-xl font-bold text-red-600 text-center mb-2">
            {title}
          </Text>

          {/* Message */}
          <Text className="text-base text-gray-500 text-center leading-6 mb-6">
            {message}
          </Text>

          {/* Close Button */}
          {showCloseButton && (
            <TouchableOpacity 
              className="bg-red-600 px-6 py-3 rounded-lg min-w-32"
              onPress={onClose}
            >
              <Text className="text-white text-base font-semibold text-center">
                Try Again
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;