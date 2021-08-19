package digaus.capacitor.plugin.demo;

import com.digaus.capacitor.wifi.Wifi;
import com.digaus.capacitor.fileserver.FileServer;

import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
     @Override
      public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);

        // Register plugins
        this.registerPlugin(Wifi.class);
        this.registerPlugin(FileServer.class);

      }
}
