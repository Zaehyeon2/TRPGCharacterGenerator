export function isNumber(value: string) {
  const numberedValue = Number(value);
  return !Number.isNaN(numberedValue) || numberedValue >= 0;
}

export function formStat(value: number, divider: number) {
  if (divider === 1) {
    if (value < 0) {
      return '0*';
    }
    if (value >= 100) {
      return '99*';
    }
  }
  if (divider === 2) {
    if (value < 0) {
      return '0*';
    }
    if (value >= 50) {
      return '49*';
    }
  }
  if (divider === 5) {
    if (value < 0) {
      return '0*';
    }
    if (value >= 20) {
      return '19*';
    }
  }
  return value;
}

export function formHp(size: number, health: number) {
  const hp = Math.floor((size + health) / 10);
  if (size > 99 || health > 99) {
    if (hp < 19) {
      return `${hp}*`;
    }
    return '19*';
  }
  if (size < 0 || health < 0) {
    return '0*';
  }
  return hp;
}

export function downloadAsJson<T>(data: T, filename: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function loadFromJsonFile<T>(file: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          reject(new Error('파일을 읽을 수 없습니다.'));
          return;
        }
        const data = JSON.parse(result) as T;
        resolve(data);
      } catch (error) {
        reject(new Error('유효하지 않은 JSON 파일입니다.'));
      }
    };
    reader.onerror = () => reject(new Error('파일 읽기 중 오류가 발생했습니다.'));
    reader.readAsText(file);
  });
}
