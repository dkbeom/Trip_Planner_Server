import { MyContext, MyContextProvider } from './provider';
import File1 from './debug';
import File2 from './debug2';

function SamplePage() {
    return (
        <MyContextProvider>
            <div>
                {/* 자식 컴포넌트들 */}
                <File1 />
                <File2 />
            </div>
        </MyContextProvider>
    );
}

export default SamplePage;