#!/bin/bash

# Скрипт для обработки ZAB-архивов с указанием целевой папки
# Использование: ./process_zab.sh /путь/к/папке

# Проверяем наличие обязательных утилит
command -v unzip >/dev/null 2>&1 || {
  echo "Ошибка: требуется утилита unzip";
  exit 1;
}

# Проверяем переданный параметр
if [ $# -eq 0 ]; then
  echo "Использование: $0 /путь/к/папке"
  exit 1
fi

target_dir="$1"

# Проверяем существование целевой папки
if [ ! -d "$target_dir" ]; then
  echo "Ошибка: папка $target_dir не существует"
  exit 1
fi

# Переходим в целевую папку
cd "$target_dir" || {
  echo "Ошибка: не удалось перейти в папку $target_dir";
  exit 1;
}

# Ищем ZAB-файл (берем первый попавшийся)
zab_file=$(ls *.zab 2>/dev/null | head -n 1)

# Проверяем наличие ZAB-файла
if [ -z "$zab_file" ]; then
  echo "Ошибка: не найден ZAB-файл в папке $target_dir"
  exit 1
fi

# Создаем временную папку для распаковки
tmp_dir=$(mktemp -d -t zab_processing_XXXXXX)

# Распаковываем ZAB-архив
unzip -q "$zab_file" -d "$tmp_dir" || {
  echo "Ошибка при распаковке ZAB-архива";
  rm -rf "$tmp_dir";
  exit 1;
}

# Обрабатываем каждый ZPK-файл
find "$tmp_dir" -type f -name "*.zpk" | while read -r zpk_file; do
  # Получаем базовые имена
  zab_base=$(basename "$zab_file" .zab)
  zpk_base=$(basename "$zpk_file" .zpk)
  
  # Создаем временную папку для ZPK
  zpk_tmp=$(mktemp -d)
  
  # Распаковываем ZPK-архив
  unzip -q "$zpk_file" -d "$zpk_tmp" || {
    echo "Ошибка при распаковке $zpk_file";
    rm -rf "$zpk_tmp";
    continue;
  }
  
  # Ищем device.zip в распакованном ZPK
  device_zip=$(find "$zpk_tmp" -type f -name "device.zip" | head -n 1)
  
  if [ -n "$device_zip" ]; then
    # Формируем новое имя
    new_name="${zab_base}-${zpk_base}.zip"
    
    # Копируем и переименовываем
    cp "$device_zip" "${target_dir}/${new_name}" && echo "Создан файл: ${target_dir}/${new_name}"
  else
    echo "Ошибка: не найден device.zip в $zpk_file"
  fi
  
  # Очищаем временные файлы ZPK
  rm -rf "$zpk_tmp"
done

# Удаляем временную папку ZAB
rm -rf "$tmp_dir"

echo "Обработка завершена! Результаты в папке: $target_dir"